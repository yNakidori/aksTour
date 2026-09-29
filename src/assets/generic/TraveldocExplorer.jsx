import { useState } from "react";
import {
  Flag,
  visas,
  authorizations,
  passport,
  displayName,
  openWhatsApp,
} from "./Traveldata.jsx";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const categories = [
  {
    id: "vistos",
    label: "Vistos",
    icon: "🛂",
    intro:
      "Autorização emitida pelo consulado do país de destino. A decisão final é sempre da autoridade consular.",
    items: visas,
  },
  {
    id: "autorizacoes",
    label: "Autorizações",
    icon: "✈️",
    intro:
      "Não é visto: é uma autorização eletrônica, pedida online e ligada ao seu passaporte. Cada país usa um nome diferente.",
    items: authorizations,
  },
  {
    id: "passaporte",
    label: "Passaporte",
    icon: "📘",
    intro:
      "Documento base de qualquer viagem internacional. Emitido pela Polícia Federal.",
    items: passport,
  },
];

export default function TravelDocsExplorer() {
  const [catId, setCatId] = useState(categories[0].id);
  const [itemByCat, setItemByCat] = useState({});

  const category = categories.find((c) => c.id === catId);
  const itemId = itemByCat[catId] ?? category.items[0].id;
  const item = category.items.find((i) => i.id === itemId);

  const selectItem = (id) => setItemByCat((prev) => ({ ...prev, [catId]: id }));

  return (
    <div className="relative min-h-[360px] md:min-h-[430px] flex items-center justify-center">
      <style>{`
        @keyframes tde-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .tde-fade { animation: tde-fade .28s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .tde-fade { animation: none; } }
      `}</style>

      <div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-60"
        style={{ backgroundColor: `${palette.gold}22` }}
      />

      <div
        className="relative w-full max-w-[520px] rounded-[28px] p-4 md:p-6 border"
        style={{
          backgroundColor: "rgba(255,255,255,0.82)",
          borderColor: "rgba(14,44,69,0.10)",
          boxShadow: "0 25px 60px rgba(14,44,69,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: palette.navy }}
        >
          O que você precisa para viajar?
        </p>
        <p className="text-xs mb-4" style={{ color: `${palette.navy}88` }}>
          Escolha uma opção e veja como funciona.
        </p>

        {/* Abas */}
        <div
          role="tablist"
          aria-label="Tipo de documento"
          className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl"
          style={{ backgroundColor: palette.subtle }}
        >
          {categories.map((c) => {
            const active = c.id === catId;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCatId(c.id)}
                className="rounded-xl px-2 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: active ? palette.navy : "transparent",
                  color: active ? "white" : `${palette.navy}99`,
                  boxShadow: active ? "0 6px 16px rgba(14,44,69,0.18)" : "none",
                }}
              >
                <span className="mr-1.5" aria-hidden="true">
                  {c.icon}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>

        <p
          key={`intro-${catId}`}
          className="tde-fade text-xs leading-relaxed mt-4"
          style={{ color: `${palette.navy}99` }}
        >
          {category.intro}
        </p>

        {/* Destinos / serviços */}
        <div
          className="flex flex-wrap gap-2 mt-3"
          role="group"
          aria-label="Destino ou serviço"
        >
          {category.items.map((i) => {
            const active = i.id === itemId;
            return (
              <button
                key={i.id}
                onClick={() => selectItem(i.id)}
                aria-pressed={active}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: active ? `${palette.gold}1f` : "white",
                  borderColor: active ? palette.gold : `${palette.navy}18`,
                  color: palette.navy,
                }}
              >
                <Flag code={i.code} symbol={i.symbol} size={13} />
                {i.name}
              </button>
            );
          })}
        </div>

        {/* Detalhe */}
        <div
          key={`${catId}-${itemId}`}
          className="tde-fade mt-4 rounded-2xl p-4 md:p-5"
          style={{ backgroundColor: palette.navy }}
        >
          <div className="flex items-center gap-3">
            <Flag code={item.code} symbol={item.symbol} size={24} />
            <h3
              className="text-lg md:text-xl font-bold"
              style={{ color: palette.pale }}
            >
              {displayName(item)}
            </h3>
          </div>

          {item.badge && (
            <span
              className="inline-block mt-2 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{
                backgroundColor: `${palette.gold}33`,
                color: palette.gold,
              }}
            >
              {item.badge}
            </span>
          )}

          <p
            className="text-sm leading-relaxed mt-2"
            style={{ color: `${palette.subtle}dd` }}
          >
            {item.summary}
          </p>

          {item.notice && (
            <p
              className="text-xs leading-relaxed mt-3 rounded-xl px-3 py-2 border"
              style={{
                color: palette.subtle,
                borderColor: `${palette.gold}55`,
                backgroundColor: "rgba(183,142,70,0.10)",
              }}
            >
              {item.notice}
            </p>
          )}

          <dl className="grid grid-cols-2 gap-2 mt-4">
            {item.facts.map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl px-3 py-2"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <dt
                  className="text-[11px]"
                  style={{ color: `${palette.subtle}99` }}
                >
                  {k}
                </dt>
                <dd
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: palette.pale }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <p
            className="text-xs font-semibold mt-5 mb-2"
            style={{ color: palette.gold }}
          >
            Como funciona com a AKS
          </p>
          <ol className="space-y-2.5">
            {item.steps.map(([title, desc], idx) => (
              <li key={title} className="flex gap-3">
                <span
                  className="flex-none w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: palette.gold, color: palette.navy }}
                >
                  {idx + 1}
                </span>
                <div>
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ color: palette.pale }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: `${palette.subtle}bb` }}
                  >
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <button
            onClick={() => openWhatsApp(item)}
            className="w-full mt-5 rounded-xl py-3 text-sm font-bold transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: palette.gold, color: palette.navy }}
          >
            {item.cta ?? `Quero ajuda com ${displayName(item)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
