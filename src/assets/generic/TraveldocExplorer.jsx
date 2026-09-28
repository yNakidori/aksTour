import { useState } from "react";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

/**
 * Conteúdo do explorador. Sem preços, de propósito.
 * Para adicionar um destino/serviço, basta incluir um item em `items`.
 */
const categories = [
  {
    id: "vistos",
    label: "Vistos",
    icon: "🛂",
    intro:
      "Autorização emitida pelo consulado do país de destino. A decisão final é sempre da autoridade consular.",
    items: [
      {
        id: "eua",
        flag: "🇺🇸",
        name: "Estados Unidos",
        summary:
          "Visto de turismo, negócios ou estudo. Exige formulário DS-160 e entrevista presencial no consulado.",
        facts: [
          ["Quem precisa", "Brasileiros que vão entrar nos EUA"],
          ["Formato", "Formulário online + entrevista"],
        ],
        steps: [
          [
            "Análise do perfil",
            "Entendemos o motivo da viagem e seu histórico.",
          ],
          ["Documentos", "Listamos e conferimos tudo o que o consulado pede."],
          ["Formulário DS-160", "Preenchemos com você, sem inconsistências."],
          ["Agendamento", "Reservamos data e local da entrevista."],
          ["Preparação", "Orientamos você para o dia da entrevista."],
        ],
      },
      {
        id: "primeiro",
        flag: "✦",
        name: "Primeiro visto",
        summary:
          "Nunca solicitou? Organizamos os documentos e conduzimos cada etapa da primeira solicitação.",
        facts: [
          ["Quem precisa", "Quem solicita o visto pela primeira vez"],
          ["Formato", "Varia conforme o país"],
        ],
        steps: [
          ["Conversa inicial", "Definimos destino e tipo de visto."],
          ["Documentos", "Montamos a lista personalizada."],
          ["Formulários", "Preenchimento revisado pela nossa equipe."],
          ["Envio", "Protocolo e acompanhamento do pedido."],
        ],
      },
      {
        id: "negativa",
        flag: "↗",
        name: "Após uma negativa",
        summary:
          "Analisamos o que pode ter pesado na decisão e ajustamos o pedido antes de uma nova solicitação.",
        facts: [
          ["Quem precisa", "Quem teve o visto negado"],
          ["Formato", "Análise do caso + novo pedido"],
        ],
        steps: [
          ["Análise do caso", "Revisamos o motivo informado pelo consulado."],
          ["Ajustes", "Corrigimos documentação e informações."],
          ["Novo pedido", "Refazemos o processo com orientação."],
        ],
      },
    ],
  },
  {
    id: "autorizacoes",
    label: "Autorizações",
    icon: "✈️",
    intro:
      "Autorizações eletrônicas de viagem: pedido 100% online, vinculado ao seu passaporte. Confira sempre a regra vigente do destino.",
    items: [
      {
        id: "canada",
        flag: "🇨🇦",
        name: "eTA Canadá",
        summary:
          "Exigida do brasileiro para entrar no Canadá por via aérea. Solicitação online, ligada ao passaporte.",
        facts: [
          ["Validade", "Até 5 anos"],
          ["Entrada", "Por via aérea"],
        ],
        steps: [
          [
            "Dados do passaporte",
            "Você nos envia os dados e uma foto do documento.",
          ],
          ["Preenchimento", "Preenchemos o pedido online."],
          ["Envio", "Enviamos e acompanhamos a resposta."],
          ["Confirmação", "Você recebe a autorização por e-mail."],
        ],
      },
      {
        id: "uk",
        flag: "🇬🇧",
        name: "UK ETA",
        summary:
          "Exigida do brasileiro desde 2025 para entrar no Reino Unido. Substitui a antiga entrada sem autorização.",
        facts: [
          ["Validade", "Até 2 anos"],
          ["Formato", "Solicitação online"],
        ],
        steps: [
          ["Dados do passaporte", "Conferimos validade e informações."],
          ["Preenchimento", "Cuidamos do formulário oficial."],
          ["Envio", "Enviamos e monitoramos a análise."],
          ["Confirmação", "Autorização vinculada ao seu passaporte."],
        ],
      },
      {
        id: "ue",
        flag: "🇪🇺",
        name: "União Europeia",
        summary:
          "Autorização eletrônica para entrar em países do espaço Schengen, conforme as regras aplicáveis.",
        facts: [
          ["Validade", "Até 5 anos"],
          ["Formato", "Solicitação online"],
        ],
        steps: [
          ["Dados do passaporte", "Verificamos se está dentro das exigências."],
          ["Preenchimento", "Preenchemos o pedido com você."],
          ["Envio", "Enviamos e acompanhamos."],
          ["Confirmação", "Você recebe o resultado por e-mail."],
        ],
      },
      {
        id: "mexico",
        flag: "🇲🇽",
        name: "e-Visa México",
        summary:
          "Confira antes: quem tem visto americano válido está dispensado do visto mexicano. Nós verificamos o seu caso.",
        facts: [
          ["Dispensa", "Quem tem visto americano válido"],
          ["Formato", "Solicitação online"],
        ],
        steps: [
          ["Verificação", "Checamos se você precisa mesmo do e-Visa."],
          ["Documentos", "Reunimos o que o portal pede."],
          ["Solicitação", "Preenchemos e enviamos online."],
          ["Confirmação", "Acompanhamos até a resposta."],
        ],
      },
    ],
  },
  {
    id: "passaporte",
    label: "Passaporte",
    icon: "📘",
    intro:
      "Documento base de qualquer viagem internacional. Emitido pela Polícia Federal.",
    items: [
      {
        id: "br",
        flag: "🇧🇷",
        name: "Passaporte brasileiro",
        summary:
          "Primeira via ou renovação. Orientamos sobre documentos, taxas oficiais e o agendamento.",
        facts: [
          ["Emissão", "Polícia Federal"],
          ["Atenção", "Confira a validade mínima do destino"],
        ],
        steps: [
          ["Situação atual", "Primeira via, renovação ou vencido?"],
          ["Documentos", "Conferimos o que precisa levar."],
          ["Agendamento", "Ajudamos a marcar o atendimento."],
          ["Retirada", "Orientamos até o passaporte estar em mãos."],
        ],
      },
    ],
  },
];

export default function TravelDocsExplorer({ onContact }) {
  const [catId, setCatId] = useState(categories[0].id);
  const [itemByCat, setItemByCat] = useState({});

  const category = categories.find((c) => c.id === catId);
  const itemId = itemByCat[catId] ?? category.items[0].id;
  const item = category.items.find((i) => i.id === itemId);

  const selectCategory = (id) => setCatId(id);
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
                onClick={() => selectCategory(c.id)}
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

        {/* Introdução da categoria */}
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
                <span aria-hidden="true">{i.flag}</span>
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
            <span className="text-3xl" aria-hidden="true">
              {item.flag}
            </span>
            <h3
              className="text-lg md:text-xl font-bold"
              style={{ color: palette.pale }}
            >
              {item.name}
            </h3>
          </div>

          <p
            className="text-sm leading-relaxed mt-2"
            style={{ color: `${palette.subtle}dd` }}
          >
            {item.summary}
          </p>

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
            onClick={onContact}
            className="w-full mt-5 rounded-xl py-3 text-sm font-bold transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2"
            style={{ backgroundColor: palette.gold, color: palette.navy }}
          >
            Quero ajuda com {item.name}
          </button>
        </div>
      </div>
    </div>
  );
}
