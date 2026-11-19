import { useState } from "react";
import {
  Flag,
  visas,
  passport,
  authorizations,
  displayName,
  openWhatsApp,
} from "./Traveldata.jsx";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

function ArrowIcon({ diagonal = false, className = "" }) {
  return diagonal ? (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  ) : (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function ServiceRow({ item, index }) {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(item)}
      className="group relative grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b px-0 py-6 text-left outline-none transition-colors duration-300 hover:bg-[#0E2C45]/[0.025] focus-visible:bg-[#0E2C45]/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B78E46] sm:gap-6 sm:px-4 sm:py-7"
      style={{ borderColor: `${palette.navy}17` }}
      aria-label={`Consultar ${displayName(item)} pelo WhatsApp`}
    >
      <span className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-0 bg-[#B78E46] transition-all duration-500 group-hover:w-full" />

      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#0E2C45]/10 bg-white sm:h-14 sm:w-14">
        <Flag code={item.code} symbol={item.symbol} size={21} />
      </span>

      <span className="block min-w-0">
        <span className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78E46]">
            Serviço {String(index + 1).padStart(2, "0")}
          </span>
          {item.badge && (
            <span className="border-l border-[#B78E46]/40 pl-3 text-[10px] font-medium uppercase tracking-[0.1em] text-[#0E2C45]/65">
              {item.badge}
            </span>
          )}
        </span>
        <span className="block text-[18px] font-semibold leading-snug tracking-[-0.025em] text-[#0E2C45] transition-colors duration-300 group-hover:text-[#B78E46] sm:text-[21px]">
          {displayName(item)}
        </span>
        {item.summary && (
          <span className="mt-2 block max-w-xl text-[13px] leading-[1.7] text-[#0E2C45]/65 sm:text-sm">
            {item.summary}
          </span>
        )}
      </span>

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0E2C45]/15 text-[#0E2C45] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#B78E46] group-hover:bg-[#B78E46] group-hover:text-white sm:h-11 sm:w-11">
        <ArrowIcon diagonal />
      </span>
    </button>
  );
}

function ServiceGroup({ number, eyebrow, title, description, items }) {
  if (!items?.length) return null;

  return (
    <section
      aria-labelledby={`travel-service-group-${number}`}
      className="scroll-mt-28"
    >
      <div className="flex items-start gap-4 border-b border-[#0E2C45]/25 pb-6 sm:gap-6">
        <span className="pt-1 font-serif text-[27px] italic leading-none text-[#B78E46] sm:text-[32px]">
          {number}
        </span>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B78E46]">
            {eyebrow}
          </p>
          <h3
            id={`travel-service-group-${number}`}
            className="font-serif text-[27px] font-normal leading-tight tracking-[-0.03em] text-[#0E2C45] sm:text-[35px]"
          >
            {title}
          </h3>
          {description && (
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#0E2C45]/65">
              {description}
            </p>
          )}
        </div>
      </div>
      <div>
        {items.map((item, index) => (
          <ServiceRow
            key={item.id ?? `${number}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("all");

  const groups = [
    {
      key: "documents",
      number: "01",
      eyebrow: "Documentação internacional",
      title: "Vistos & passaportes",
      description:
        "Orientação para solicitações, renovações e organização documental.",
      items: [...visas, ...passport],
    },
    {
      key: "authorizations",
      number: "02",
      eyebrow: "Requisitos de entrada",
      title: "Autorizações eletrônicas",
      description:
        "Não são vistos: são autorizações solicitadas online e vinculadas ao passaporte. As regras variam conforme o destino.",
      items: authorizations,
    },
  ];

  const visibleGroups =
    activeTab === "all"
      ? groups
      : groups.filter((group) => group.key === activeTab);

  return (
    <section
      id="visa-passports"
      className="relative isolate overflow-hidden bg-[#F6FBF8] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#0E2C45]/10" />
      <div className="pointer-events-none absolute -left-28 top-44 h-96 w-96 rounded-full border border-[#B78E46]/10" />
      <div className="pointer-events-none absolute -left-16 top-56 h-72 w-72 rounded-full border border-[#B78E46]/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-28">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B78E46]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78E46]">
                Assessoria de viagem
              </span>
            </div>

            <h2 className="max-w-lg font-serif text-[clamp(2.7rem,4.3vw,4.6rem)] font-normal leading-[1.08] tracking-[-0.045em] text-[#0E2C45]">
              O mundo começa com a{" "}
              <span className="italic text-[#B78E46]">documentação certa.</span>
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-8 text-[#0E2C45]/70">
              Viajar deve ser sobre descobrir novos lugares, não sobre enfrentar
              burocracias. Ajudamos você a entender os requisitos e organizar
              cada etapa da sua solicitação.
            </p>

            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="group mt-9 inline-flex min-h-14 items-center gap-6 bg-[#0E2C45] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:bg-[#B78E46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78E46]"
            >
              Falar com um especialista
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="mt-12 flex max-w-sm items-start gap-4 border-t border-[#0E2C45]/15 pt-6">
              <span className="font-serif text-3xl italic text-[#B78E46]">
                “
              </span>
              <p className="text-xs leading-6 text-[#0E2C45]/60">
                Atendimento personalizado para você planejar sua próxima viagem
                com mais tranquilidade.
              </p>
            </div>
          </div>

          <div>
            <div
              className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[#0E2C45]/15 pb-5"
              role="group"
              aria-label="Filtrar serviços de viagem"
            >
              {[
                { key: "all", label: "Todos os serviços" },
                { key: "documents", label: "Vistos e passaportes" },
                { key: "authorizations", label: "Autorizações" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  aria-pressed={activeTab === tab.key}
                  className={`relative pb-1 text-[12px] font-semibold tracking-[0.01em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B78E46] ${activeTab === tab.key ? "text-[#0E2C45]" : "text-[#0E2C45]/50 hover:text-[#0E2C45]"}`}
                >
                  {tab.label}
                  <span
                    className={`absolute -bottom-[21px] left-0 h-[2px] bg-[#B78E46] transition-all duration-200 ${activeTab === tab.key ? "w-full" : "w-0"}`}
                  />
                </button>
              ))}
            </div>

            <div className="space-y-14">
              {visibleGroups.map((group) => (
                <ServiceGroup key={group.key} {...group} />
              ))}
            </div>

            <p className="mt-8 text-xs leading-6 text-[#0E2C45]/55">
              Os requisitos e prazos podem variar conforme o país e o perfil do
              viajante. Consulte nossa equipe para orientações sobre o seu caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
