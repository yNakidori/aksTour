import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Lottie from "react-lottie";
import Whats from "../whats.json";

const defaultQuickQuestions = [
  "Primeiro visto",
  "Renovação de visto",
  "Tive o visto negado",
  "Passaporte brasileiro",
  "eTA União Europeia",
  "eTA Canadá",
  "UK ETA",
];

const defaultIntroMessage =
  "Olá! Eu sou o assistente da AKSTur. 👋\n\nPosso ajudar você com vistos, passaportes e autorizações de viagem. Escolha uma das opções abaixo ou escreva sua dúvida.";

const defaultGetBotReply = (message) => {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // PRIMEIRO VISTO
  if (
    normalized.includes("primeiro visto") ||
    normalized.includes("primeira solicitacao") ||
    normalized.includes("primeira solicitação") ||
    normalized.includes("tirar visto") ||
    normalized.includes("visto pela primeira vez")
  ) {
    return (
      "Perfeito! Podemos orientar você na solicitação do seu primeiro visto. " +
      "A assessoria inclui a organização das informações, conferência dos documentos " +
      "e orientação durante as etapas do processo.\n\n" +
      "Para começarmos, me diga qual país você pretende visitar."
    );
  }

  // RENOVAÇÃO
  if (
    normalized.includes("renovacao") ||
    normalized.includes("renovar") ||
    normalized.includes("renovação")
  ) {
    return (
      "Claro! Trabalhamos com assessoria para renovação de vistos e documentos. " +
      "Podemos verificar a documentação necessária e orientar você sobre as etapas.\n\n" +
      "Qual visto ou documento você deseja renovar?"
    );
  }

  // NEGATIVA
  if (
    normalized.includes("negado") ||
    normalized.includes("negativa") ||
    normalized.includes("recusado") ||
    normalized.includes("recusa")
  ) {
    return (
      "Entendi. Podemos orientar uma nova solicitação após uma negativa, " +
      "avaliando os pontos que precisam ser ajustados antes de iniciar um novo processo.\n\n" +
      "Se quiser, me conte qual visto foi negado e, se souber, quando ocorreu a negativa."
    );
  }

  // eTA UNIÃO EUROPEIA
  if (
    normalized.includes("eta europa") ||
    normalized.includes("eta uniao") ||
    normalized.includes("eta união") ||
    normalized.includes("uniao europeia") ||
    normalized.includes("união europeia")
  ) {
    return (
      "Ótimo! 🇪🇺\n\n" +
      "Podemos orientar você sobre a autorização eletrônica de viagem para a União Europeia, " +
      "conforme as regras aplicáveis ao seu caso.\n\n" +
      "Você já sabe para qual país da União Europeia pretende viajar?"
    );
  }

  // eTA CANADÁ
  if (
    normalized.includes("eta canada") ||
    normalized.includes("eta canadá") ||
    normalized.includes("canada") ||
    normalized.includes("canadá")
  ) {
    return (
      "Claro! 🇨🇦\n\n" +
      "Oferecemos assessoria para a autorização eletrônica de viagem do Canadá, " +
      "com orientação sobre os requisitos e informações necessárias.\n\n" +
      "Você pretende viajar para o Canadá em breve?"
    );
  }

  // UK ETA
  if (
    normalized.includes("uk eta") ||
    normalized.includes("eta reino unido") ||
    normalized.includes("reino unido") ||
    normalized.includes("inglaterra")
  ) {
    return (
      "Perfeito! 🇬🇧\n\n" +
      "Podemos orientar você sobre a autorização eletrônica de viagem do Reino Unido " +
      "e os requisitos aplicáveis ao seu caso.\n\n" +
      "Você já possui uma data aproximada para a viagem?"
    );
  }

  // PASSAPORTE
  if (
    normalized.includes("passaporte") ||
    normalized.includes("passaporte brasileiro")
  ) {
    return (
      "Claro! 🛂\n\n" +
      "Também oferecemos suporte para a solicitação do passaporte brasileiro, " +
      "com orientação sobre documentação e etapas do processo.\n\n" +
      "Você precisa solicitar um passaporte pela primeira vez ou renovar?"
    );
  }

  // SERVIÇOS GERAIS
  if (
    normalized.includes("promocao") ||
    normalized.includes("promocões") ||
    normalized.includes("oferta")
  ) {
    return (
      "Temos opções de viagens nacionais e internacionais. " +
      "Se você quiser, posso direcionar seu atendimento para passagens ou pacotes."
    );
  }

  if (
    normalized.includes("hosped") ||
    normalized.includes("hotel") ||
    normalized.includes("acomod")
  ) {
    return (
      "Perfeito. Também podemos ajudar com hospedagens. " +
      "Me diga a cidade e as datas aproximadas da sua viagem."
    );
  }

  if (normalized.includes("cruzeiro")) {
    return (
      "Excelente escolha! 🚢\n\n" +
      "Trabalhamos com opções de cruzeiros nacionais e internacionais. " +
      "Você procura uma viagem curta ou longa?"
    );
  }

  if (
    normalized.includes("atendente") ||
    normalized.includes("humano") ||
    normalized.includes("pessoa")
  ) {
    return (
      "Claro. Posso organizar sua solicitação aqui e, em seguida, " +
      "encaminhar o histórico para nosso atendimento no WhatsApp."
    );
  }

  return (
    "Entendi. Posso ajudar principalmente com vistos, passaportes e autorizações " +
    "de viagem.\n\n" +
    "Escolha uma das opções acima ou me conte brevemente o que você precisa."
  );
};

const WhatsAppAssistant = forwardRef(function WhatsAppAssistant(
  {
    whatsappNumber = "5511957700305",
    introMessage = defaultIntroMessage,
    quickQuestions = defaultQuickQuestions,
    getBotReply = defaultGetBotReply,
  },
  ref,
) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: introMessage,
    },
  ]);

  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: Whats,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    [],
  );

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const appendChatMessage = (from, text) => {
    setChatMessages((prev) => [...prev, { from, text }]);
  };

  const handleQuickQuestion = (question) => {
    appendChatMessage("user", question);
    appendChatMessage("bot", getBotReply(question));
  };

  const handleSendChat = () => {
    const cleanMessage = chatInput.trim();

    if (!cleanMessage) {
      return;
    }

    appendChatMessage("user", cleanMessage);
    appendChatMessage("bot", getBotReply(cleanMessage));

    setChatInput("");
  };

  const handleChatInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendChat();
    }
  };

  const forwardConversationToWhatsApp = () => {
    const conversation = chatMessages
      .map((msg) => `${msg.from === "bot" ? "AKS" : "Cliente"}: ${msg.text}`)
      .join("\n");

    const whatsappText = encodeURIComponent(
      `Olá! Segue meu histórico do atendimento:\n\n${conversation}`,
    );

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

    window.open(whatsappLink, "_blank");
  };

  useImperativeHandle(ref, () => ({
    openChat,
    closeChat,
    toggleChat,
    forwardConversationToWhatsApp,
  }));

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          {/* HEADER */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{
              backgroundColor: "#0E2C45",
              color: "#F6FBF8",
            }}
          >
            <div>
              <h3 className="font-bold">AKSTur Atendimento</h3>

              <p className="text-xs opacity-80" style={{ color: "#E6F0EC" }}>
                Vistos, passaportes e viagens
              </p>
            </div>

            <button
              type="button"
              onClick={closeChat}
              className="text-white text-lg leading-none hover:opacity-70"
              aria-label="Fechar atendimento"
            >
              ×
            </button>
          </div>

          {/* MENSAGENS */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {chatMessages.map((msg, index) => (
              <div
                key={`${msg.from}-${index}`}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                  style={
                    msg.from === "user"
                      ? {
                          backgroundColor: "#B78E46",
                        }
                      : {}
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* OPÇÕES */}
          <div className="px-3 pt-3 bg-white">
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: "#0E2C45" }}
            >
              Serviços de vistos e passaportes
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-3 py-2 rounded-full border transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#F6FBF8",
                    color: "#0E2C45",
                    borderColor: "#B78E4655",
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT */}
          <div className="px-3 py-2 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={handleChatInputKeyDown}
                placeholder="Digite sua dúvida..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                style={{
                  borderColor: "#0E2C4530",
                }}
              />

              <button
                type="button"
                onClick={handleSendChat}
                className="px-3 py-2 rounded-lg text-white text-sm font-semibold"
                style={{
                  backgroundColor: "#0E2C45",
                }}
              >
                Enviar
              </button>
            </div>

            {/* WHATSAPP */}
            <button
              type="button"
              onClick={forwardConversationToWhatsApp}
              className="w-full mt-2 px-3 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#25D366",
              }}
            >
              Continuar no WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE */}
      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer"
        onClick={toggleChat}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleChat();
          }
        }}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    </>
  );
});

export default WhatsAppAssistant;
