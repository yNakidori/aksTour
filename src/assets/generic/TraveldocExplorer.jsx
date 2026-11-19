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
    short: "Solicitações consulares",
    intro:
      "A decisão sobre a emissão é sempre da autoridade responsável pelo destino.",
    items: visas,
  },
  {
    id: "autorizacoes",
    label: "Autorizações",
    short: "Permissões eletrônicas",
    intro:
      "Autorizações solicitadas online e vinculadas ao passaporte, conforme as regras de cada país.",
    items: authorizations,
  },
  {
    id: "passaporte",
    label: "Passaporte",
    short: "Emissão e renovação",
    intro:
      "Orientação para o processo de solicitação ou renovação do passaporte.",
    items: passport,
  },
];

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function TravelDocsExplorer() {
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [selectionByCategory, setSelectionByCategory] = useState({});

  const category =
    categories.find((entry) => entry.id === categoryId) ?? categories[0];
  const items = category.items ?? [];
  const selectedId = selectionByCategory[categoryId] ?? items[0]?.id;
  const item = items.find((entry) => entry.id === selectedId) ?? items[0];

  return (
    <div className="w-full overflow-hidden border border-[#0E2C45]/10 bg-white shadow-[0_25px_75px_-45px_rgba(14,44,69,0.35)]">
      <div className="border-b border-[#0E2C45]/10 px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B78E46]">
              Consultoria de viagem
            </p>
            <h2 className="mt-2 font-serif text-[25px] leading-tight text-[#0E2C45] sm:text-[29px]">
              Explore os documentos
            </h2>
          </div>
          <span
            className="hidden h-10 w-10 shrink-0 items-center justify-center border border-[#B78E46]/40 font-serif text-xl italic text-[#B78E46] sm:flex"
            aria-hidden="true"
          >
            A
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-3 border-b border-[#0E2C45]/10"
        aria-label="Tipo de serviço"
      >
        {categories.map((entry, index) => {
          const active = entry.id === categoryId;
          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCategoryId(entry.id)}
              className={`relative min-w-0 px-2 py-4 text-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#B78E46] sm:px-4 ${index > 0 ? "border-l border-[#0E2C45]/10" : ""}`}
              style={{
                backgroundColor: active ? palette.navy : "#fff",
                color: active ? "white" : palette.navy,
              }}
            >
              <span className="block text-xs font-semibold sm:text-sm">
                {entry.label}
              </span>
              <span
                className={`mt-1 hidden text-[10px] sm:block ${active ? "text-white/65" : "text-[#0E2C45]/50"}`}
              >
                {entry.short}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 h-[3px] w-10 -translate-x-1/2 bg-[#B78E46]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <p className="min-h-[2.5rem] text-xs leading-relaxed text-[#0E2C45]/60">
          {category.intro}
        </p>

        {items.length > 0 ? (
          <>
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Selecionar destino ou serviço"
            >
              {items.map((entry) => {
                const active = item?.id === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectionByCategory((previous) => ({
                        ...previous,
                        [categoryId]: entry.id,
                      }))
                    }
                    className="inline-flex min-h-9 items-center gap-2 border px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78E46]"
                    style={{
                      backgroundColor: active ? palette.subtle : "white",
                      borderColor: active ? palette.navy : `${palette.navy}20`,
                      color: palette.navy,
                    }}
                  >
                    <Flag code={entry.code} symbol={entry.symbol} size={14} />
                    <span>{entry.name ?? displayName(entry)}</span>
                  </button>
                );
              })}
            </div>

            {item && (
              <div
                key={`${categoryId}-${item.id}`}
                className="mt-6 animate-[fadeIn_.25s_ease-out] border-t border-[#0E2C45]/10 pt-5"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    <Flag code={item.code} symbol={item.symbol} size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-[25px] leading-tight text-[#0E2C45]">
                        {displayName(item)}
                      </h3>
                      {item.badge && (
                        <span className="border border-[#B78E46]/40 px-2 py-1 text-[10px] font-semibold text-[#926E2F]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.summary && (
                      <p className="mt-2 text-sm leading-relaxed text-[#0E2C45]/70">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </div>

                {item.notice && (
                  <div className="mt-4 border-l-2 border-[#B78E46] bg-[#F6FBF8] px-4 py-3 text-xs leading-relaxed text-[#0E2C45]/75">
                    {item.notice}
                  </div>
                )}

                {item.facts?.length > 0 && (
                  <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-[#0E2C45]/10 py-4">
                    {item.facts.map(([label, value], index) => (
                      <div key={`${label}-${index}`} className="min-w-0">
                        <dt className="text-[10px] uppercase tracking-[0.12em] text-[#0E2C45]/50">
                          {label}
                        </dt>
                        <dd className="mt-1 break-words text-xs font-semibold leading-relaxed text-[#0E2C45]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {item.steps?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B78E46]">
                      Como funciona com a AKS
                    </p>
                    <ol className="mt-3 space-y-3">
                      {item.steps.map(([title, description], index) => (
                        <li key={`${title}-${index}`} className="flex gap-3">
                          <span className="w-6 shrink-0 font-serif text-lg leading-6 text-[#B78E46]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[#0E2C45]">
                              {title}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-[#0E2C45]/60">
                              {description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => openWhatsApp(item)}
                  className="mt-6 flex w-full items-center justify-between gap-3 bg-[#0E2C45] px-5 py-4 text-left text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#173E5D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78E46]"
                >
                  <span>
                    {item.cta ?? `Quero ajuda com ${displayName(item)}`}
                  </span>
                  <ArrowIcon className="h-5 w-5 shrink-0 text-[#B78E46]" />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm text-[#0E2C45]/60">
            Nenhum serviço disponível nesta categoria.
          </p>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } } @media (prefers-reduced-motion: reduce) { [class*="animate-[fadeIn"] { animation: none !important; } }`}</style>
    </div>
  );
}
