import {
  Flag,
  visas,
  passport,
  authorizations,
  displayName,
} from "../generic/Traveldata.jsx";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

function ServiceCard({ item, onContact }) {
  return (
    <button
      onClick={() => onContact?.(item)}
      className="group text-left rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
      style={{
        backgroundColor: "white",
        borderColor: `${palette.navy}12`,
        boxShadow: "0 6px 24px rgba(14,44,69,0.05)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: `${palette.gold}12`,
            borderColor: `${palette.gold}35`,
          }}
        >
          <Flag code={item.code} symbol={item.symbol} size={16} />
        </div>

        {item.badge && (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              backgroundColor: `${palette.gold}22`,
              color: palette.gold,
            }}
          >
            {item.badge}
          </span>
        )}
      </div>

      <h3 className="font-bold mt-5 mb-2" style={{ color: palette.navy }}>
        {displayName(item)}
      </h3>

      <p
        className="text-sm leading-relaxed"
        style={{ color: `${palette.navy}88` }}
      >
        {item.summary}
      </p>

      <span
        className="inline-block text-xs font-bold mt-4"
        style={{ color: palette.gold }}
      >
        Saiba mais →
      </span>
    </button>
  );
}

function Group({ title, description, items, onContact }) {
  return (
    <div>
      <h3 className="text-lg font-bold" style={{ color: palette.navy }}>
        {title}
      </h3>
      {description && (
        <p
          className="text-sm mt-1 mb-4 max-w-xl"
          style={{ color: `${palette.navy}88` }}
        >
          {description}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {items.map((item) => (
          <ServiceCard key={item.id} item={item} onContact={onContact} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection({ onContact }) {
  return (
    <section
      id="visa-passports"
      className="py-16 md:py-20 px-6"
      style={{ backgroundColor: palette.pale }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.8fr_1.7fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: palette.gold }}
            >
              Vistos & Passaportes
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-3 leading-tight"
              style={{ color: palette.navy }}
            >
              Encontre o serviço que você precisa
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: `${palette.navy}99` }}
            >
              Da renovação à primeira solicitação, cuidamos da organização dos
              documentos e orientamos você em cada etapa.
            </p>

            <button
              onClick={() => onContact?.()}
              className="mt-7 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: palette.gold, color: palette.navy }}
            >
              Consultar meu caso
            </button>
          </div>

          <div className="space-y-12">
            <Group
              title="Vistos e passaporte"
              items={[...visas, ...passport]}
              onContact={onContact}
            />
            <Group
              title="Autorizações eletrônicas de viagem"
              description="Não são vistos: são autorizações pedidas online, ligadas ao passaporte. Cada país usa um nome diferente."
              items={authorizations}
              onContact={onContact}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
