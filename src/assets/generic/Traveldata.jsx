import { useState } from "react";

/**
 * Bandeira como imagem. Emojis de bandeira (🇪🇺, 🇨🇦...) NÃO renderizam no
 * Windows: aparecem só as letras ("EU", "CA"). Por isso usamos flagcdn.com.
 * Se a imagem falhar, cai para o símbolo/código em texto.
 */
export function Flag({ code, symbol, size = 20 }) {
  const [failed, setFailed] = useState(false);

  if (code && !failed) {
    return (
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={() => setFailed(true)}
        style={{
          width: size * 1.4,
          height: size,
          objectFit: "cover",
          borderRadius: 3,
          boxShadow: "0 0 0 1px rgba(14,44,69,0.12)",
          display: "inline-block",
        }}
      />
    );
  }
  return (
    <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>
      {symbol ?? code?.toUpperCase()}
    </span>
  );
}

/* ---------- Vistos ---------- */

export const visas = [
  {
    id: "eua",
    code: "us",
    name: "Visto Americano",
    summary:
      "Turismo, negócios ou estudo. Inclui o formulário DS-160 e a preparação para a entrevista no consulado.",
    facts: [
      ["Formato", "Formulário online + entrevista"],
      ["Decisão", "Sempre do consulado"],
    ],
    steps: [
      ["Análise do perfil", "Entendemos o motivo da viagem e seu histórico."],
      ["Documentos", "Listamos e conferimos tudo o que o consulado pede."],
      ["Formulário DS-160", "Preenchemos com você, sem inconsistências."],
      ["Agendamento", "Reservamos data e local da entrevista."],
      ["Preparação", "Orientamos você para o dia da entrevista."],
    ],
  },
  {
    id: "primeiro",
    symbol: "✦",
    name: "Primeiro visto",
    summary:
      "Assessoria para a primeira solicitação, com orientação sobre documentos, formulários e todas as etapas.",
    facts: [
      ["Para quem", "Quem solicita pela primeira vez"],
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
    id: "renovacao",
    symbol: "↻",
    name: "Renovação",
    summary:
      "Renovação de vistos e documentos, com conferência de tudo o que é necessário.",
    facts: [
      ["Para quem", "Quem já teve o visto e precisa renovar"],
      ["Formato", "Varia conforme o país"],
    ],
    steps: [
      ["Situação atual", "Verificamos validade e histórico."],
      ["Documentos", "Conferimos a documentação necessária."],
      ["Formulários", "Preenchemos e revisamos."],
      ["Envio", "Acompanhamos até a conclusão."],
    ],
  },
  {
    id: "negativa",
    symbol: "↗",
    name: "Nova solicitação pós-negativa",
    summary:
      "Orientação para uma nova solicitação após uma negativa, considerando os pontos que precisam ser ajustados.",
    facts: [
      ["Para quem", "Quem teve o visto negado"],
      ["Formato", "Análise do caso + novo pedido"],
    ],
    steps: [
      ["Análise do caso", "Revisamos o motivo informado pelo consulado."],
      ["Ajustes", "Corrigimos documentação e informações."],
      ["Novo pedido", "Refazemos o processo com orientação."],
    ],
  },
];

/* ---------- Autorizações eletrônicas de viagem ---------- */

const AUTH_STEPS = [
  ["Dados do passaporte", "Você nos envia os dados e uma foto do documento."],
  ["Preenchimento", "Preenchemos o pedido oficial online."],
  ["Envio", "Enviamos e acompanhamos a resposta."],
  ["Confirmação", "A autorização fica vinculada ao seu passaporte."],
];

/**
 * Cada país usa um nome diferente para a mesma ideia.
 * `acronym` é o nome oficial da autorização.
 */
export const authorizations = [
  {
    id: "canada",
    code: "ca",
    acronym: "eTA",
    name: "Canadá",
    summary:
      "Exigida do brasileiro para entrar no Canadá por via aérea. Solicitação online, ligada ao passaporte.",
    facts: [
      ["Validade", "Até 5 anos, ou até o passaporte vencer"],
      ["Entrada", "Por via aérea"],
    ],
    steps: AUTH_STEPS,
  },
  {
    id: "uk",
    code: "gb",
    acronym: "ETA",
    name: "Reino Unido",
    summary:
      "Exigida do brasileiro desde 2025 para entrar no Reino Unido. Solicitação online, ligada ao passaporte.",
    facts: [
      ["Validade", "Até 2 anos"],
      ["Formato", "Solicitação online"],
    ],
    steps: AUTH_STEPS,
  },
  {
    id: "ue",
    code: "eu",
    acronym: "ETIAS",
    name: "União Europeia",
    badge: "Ainda não obrigatória",
    summary:
      "Nova autorização para entrar em 30 países europeus. Ainda não está em vigor: até lá, o passaporte válido continua sendo suficiente.",
    notice:
      "A UE prevê o início no último trimestre de 2026, e há notícias de possível adiamento para 2027. A data oficial será divulgada com alguns meses de antecedência.",
    facts: [
      ["Validade", "3 anos, ou até o passaporte vencer"],
      ["Situação", "Ainda não obrigatória"],
    ],
    steps: [
      ["Acompanhamos a data", "Monitoramos o anúncio oficial da UE."],
      ["Dados do passaporte", "Conferimos se a validade atende à regra."],
      ["Preenchimento", "Cuidamos do pedido quando o sistema abrir."],
      ["Confirmação", "Autorização vinculada ao seu passaporte."],
    ],
    cta: "Tirar dúvidas sobre o ETIAS",
  },
  {
    id: "australia",
    code: "au",
    acronym: "ETA",
    name: "Austrália",
    summary:
      "Autorização eletrônica para curtas estadias na Austrália. Verificamos no seu caso qual modalidade se aplica.",
    notice:
      "A elegibilidade depende do passaporte. Analisamos se cabe a ETA ou se é preciso um visto de visitante.",
    facts: [
      ["Formato", "Solicitação online"],
      ["Vínculo", "Ao passaporte"],
    ],
    steps: [
      ["Verificação", "Confirmamos qual modalidade se aplica a você."],
      ["Dados do passaporte", "Você nos envia os dados e uma foto."],
      ["Envio", "Enviamos e acompanhamos a resposta."],
      ["Confirmação", "Você recebe o resultado por e-mail."],
    ],
  },
  {
    id: "nz",
    code: "nz",
    acronym: "NZeTA",
    name: "Nova Zelândia",
    summary:
      "Autorização eletrônica de viagem exigida para entrar na Nova Zelândia.",
    facts: [
      ["Formato", "Solicitação online"],
      ["Vínculo", "Ao passaporte"],
    ],
    steps: AUTH_STEPS,
  },
  {
    id: "israel",
    code: "il",
    acronym: "ETA-IL",
    name: "Israel",
    summary: "Autorização eletrônica de viagem exigida para entrar em Israel.",
    facts: [
      ["Formato", "Solicitação online"],
      ["Vínculo", "Ao passaporte"],
    ],
    steps: AUTH_STEPS,
  },
];

/* ---------- Passaporte ---------- */

export const passport = [
  {
    id: "br",
    code: "br",
    name: "Passaporte brasileiro",
    summary:
      "Primeira via ou renovação. Orientamos sobre documentos, taxas oficiais e o agendamento.",
    facts: [
      ["Emissão", "Polícia Federal"],
      ["Atenção", "Confira a validade mínima exigida pelo destino"],
    ],
    steps: [
      ["Situação atual", "Primeira via, renovação ou vencido?"],
      ["Documentos", "Conferimos o que precisa levar."],
      ["Agendamento", "Ajudamos a marcar o atendimento."],
      ["Retirada", "Orientamos até o passaporte estar em mãos."],
    ],
  },
];

/** Nome de exibição: "eTA Canadá", "ETIAS União Europeia", ou só o nome. */
export const displayName = (item) =>
  item.acronym ? `${item.acronym} ${item.name}` : item.name;
