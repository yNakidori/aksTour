import React, { useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { compressImageFromUrl } from "../../utils/compressImage";

// Collections to migrate and their image field + storage folder
const COLLECTIONS = [
  {
    name: "internationalOffers",
    imageField: "Image",
    folder: "internationalOffers",
  },
  { name: "nationalOffers", imageField: "Image", folder: "nationalOffers" },
  { name: "events", imageField: "Image", folder: "events" },
  { name: "buses", imageField: "mainImageUrl", folder: "buses" },
];

const MAX_WIDTH = 800;
const QUALITY = 0.65;

const MigrateImages = () => {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const addLog = (msg, type = "info") => {
    setLog((prev) => [...prev, { msg, type, ts: Date.now() }]);
  };

  const deleteOldImage = async (storage, imageUrl) => {
    try {
      const url = new URL(imageUrl);
      const decoded = decodeURIComponent(url.pathname);
      const start = decoded.indexOf("/o/") + 3;
      const end =
        decoded.indexOf("?alt=") !== -1
          ? decoded.indexOf("?alt=")
          : decoded.length;
      if (start < 3 || end <= start) return;
      const path = decoded.substring(start, end);
      await deleteObject(ref(storage, path));
    } catch (_) {
      // old image may already be missing — not fatal
    }
  };

  const runMigration = async () => {
    setLog([]);
    setRunning(true);
    setDone(false);
    const storage = getStorage();
    let total = 0;
    let success = 0;
    let skipped = 0;

    for (const col of COLLECTIONS) {
      addLog(`🔍 Processando coleção: ${col.name}`);
      let snapshot;
      try {
        snapshot = await getDocs(collection(db, col.name));
      } catch (e) {
        addLog(`❌ Erro ao buscar ${col.name}: ${e.message}`, "error");
        continue;
      }

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const imageUrl = data[col.imageField];

        if (!imageUrl || !imageUrl.startsWith("http")) {
          addLog(`  ⏭ ${docSnap.id} — sem imagem, pulando.`, "skip");
          skipped++;
          continue;
        }

        total++;
        try {
          const blob = await compressImageFromUrl(imageUrl, MAX_WIDTH, QUALITY);

          const timestamp = Date.now();
          const filename = `${timestamp}_migrated.jpg`;
          const newRef = ref(storage, `${col.folder}/${filename}`);
          const metadata = {
            contentType: "image/jpeg",
            cacheControl: "public, max-age=31536000, immutable",
          };
          await uploadBytes(newRef, blob, metadata);
          const newUrl = await getDownloadURL(newRef);

          await updateDoc(doc(db, col.name, docSnap.id), {
            [col.imageField]: newUrl,
          });

          // Delete old image after successful update
          await deleteOldImage(storage, imageUrl);

          success++;
          addLog(
            `  ✅ ${docSnap.id} — ${(blob.size / 1024).toFixed(1)} KB`,
            "success",
          );
        } catch (e) {
          addLog(`  ❌ ${docSnap.id} — ${e.message}`, "error");
        }
      }
    }

    addLog(
      `\n🏁 Concluído: ${success}/${total} migradas, ${skipped} sem imagem.`,
      success === total ? "success" : "warn",
    );
    setRunning(false);
    setDone(true);
  };

  const colorMap = {
    info: "text-gray-300",
    success: "text-green-400",
    error: "text-red-400",
    skip: "text-yellow-400",
    warn: "text-orange-400",
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Migração de Imagens
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Recomprime todas as imagens existentes no banco para{" "}
        <strong>
          max {MAX_WIDTH}px / JPEG {Math.round(QUALITY * 100)}%
        </strong>
        . Cada imagem original será substituída pela versão comprimida.
      </p>

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 text-sm text-yellow-800">
        ⚠️ Esta operação é irreversível. As imagens originais serão deletadas do
        Storage após a migração. Faça backup se necessário.
      </div>

      <button
        onClick={runMigration}
        disabled={running}
        className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {running ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Migrando...
          </>
        ) : done ? (
          "Executar novamente"
        ) : (
          "Iniciar Migração"
        )}
      </button>

      {log.length > 0 && (
        <div className="mt-6 bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
          {log.map((entry, i) => (
            <p
              key={i}
              className={`text-xs font-mono leading-5 ${colorMap[entry.type] ?? "text-gray-300"}`}
            >
              {entry.msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MigrateImages;
