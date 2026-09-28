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
  "Olá! 👋 Sou o assistente da AKS Vistos e Viagens.\n\nEscolha uma opção abaixo ou escreva sua dúvida.";

const defaultGetBotReply = (message) => {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // PRIMEIRO VISTO
  if (
    normalized.includes("primeiro visto") ||
    normalized.includes("primeira solicitacao") ||
    normalized.includes("tirar visto") ||
    normalized.includes("visto pela primeira vez")
  ) {
    return (
      "Claro! Podemos orientar você em todo o processo do primeiro visto, " +
      "desde a documentação até as etapas da solicitação.\n\n" +
      "Qual país você pretende visitar?"
    );
  }

  // RENOVAÇÃO
  if (normalized.includes("renovacao") || normalized.includes("renovar")) {
    return (
      "Claro! Podemos auxiliar na renovação do seu visto, " +
      "orientando sobre documentos e etapas do processo.\n\n" +
      "Para saber mais sobre o seu caso, continue pelo WhatsApp."
    );
  }

  // VISTO NEGADO
  if (
    normalized.includes("visto negado") ||
    normalized.includes("visto foi negado") ||
    normalized.includes("negativa") ||
    normalized.includes("recusado") ||
    normalized.includes("recusa")
  ) {
    return (
      "Entendi. Podemos orientar você sobre uma nova solicitação após uma negativa.\n\n" +
      "Para analisar seu caso com mais detalhes, continue pelo WhatsApp."
    );
  }

  // eTA UNIÃO EUROPEIA
  if (normalized.includes("eta uniao") || normalized.includes("eta europa")) {
    return (
      "Podemos orientar você sobre a autorização eletrônica de viagem " +
      "para a União Europeia, conforme as regras aplicáveis ao seu destino.\n\n" +
      "Para saber mais, continue pelo WhatsApp."
    );
  }

  // eTA CANADÁ
  if (normalized.includes("eta canada")) {
    return (
      "Podemos orientar você sobre a eTA do Canadá e os requisitos " +
      "necessários para a sua viagem.\n\n" +
      "Para saber mais, continue pelo WhatsApp."
    );
  }

  // UK ETA
  if (normalized.includes("uk eta") || normalized.includes("eta reino unido")) {
    return (
      "Podemos orientar você sobre a autorização eletrônica de viagem " +
      "do Reino Unido e os requisitos aplicáveis.\n\n" +
      "Para saber mais, continue pelo WhatsApp."
    );
  }

  // PASSAPORTE
  if (normalized.includes("passaporte")) {
    return (
      "Podemos auxiliar na solicitação do passaporte brasileiro, " +
      "com orientação sobre documentação e etapas.\n\n" +
      "Para continuar, fale com nosso consultor pelo WhatsApp."
    );
  }

  // HOSPEDAGEM
  if (
    normalized.includes("hotel") ||
    normalized.includes("hospedagem") ||
    normalized.includes("hosped")
  ) {
    return (
      "Podemos ajudar você a encontrar opções de hospedagem para sua viagem.\n\n" +
      "Para consultar opções e valores, continue pelo WhatsApp."
    );
  }

  // CRUZEIROS
  if (normalized.includes("cruzeiro")) {
    return (
      "Temos opções de cruzeiros nacionais e internacionais.\n\n" +
      "Para conhecer as opções disponíveis para o seu perfil, continue pelo WhatsApp."
    );
  }

  // ATENDENTE
  if (
    normalized.includes("atendente") ||
    normalized.includes("consultor") ||
    normalized.includes("humano") ||
    normalized.includes("pessoa")
  ) {
    return (
      "Claro! Vamos continuar seu atendimento pelo WhatsApp.\n\n" +
      "Clique em “Continuar no WhatsApp” para falar com um consultor."
    );
  }

  // QUALQUER DESTINO OU DÚVIDA NÃO RECONHECIDA
  return (
    "Entendi! Para saber mais sobre as opções para o seu destino, " +
    "vamos continuar no WhatsApp, onde um consultor poderá tirar " +
    "todas as suas dúvidas e auxiliar no processo necessário."
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
      `Olá! Gostaria de continuar meu atendimento com um consultor.\n\nHistórico:\n${conversation}`,
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
        <div
          className="
            fixed
            bottom-24
            right-5
            z-50
            w-[92vw]
            max-w-sm
            max-h-[calc(100vh-120px)]
            rounded-2xl
            bg-white
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
            flex
            flex-col
          "
        >
          {/* HEADER */}
          <div
            className="
              px-4
              py-3
              flex
              items-center
              justify-between
              shrink-0
            "
            style={{
              backgroundColor: "#0E2C45",
              color: "#F6FBF8",
            }}
          >
            <div>
              <h3 className="font-bold text-sm">
                AKS Vistos e Viagens Atendimento
              </h3>

              <p className="text-xs opacity-80" style={{ color: "#E6F0EC" }}>
                Vistos, passaportes e viagens
              </p>
            </div>

            <button
              type="button"
              onClick={closeChat}
              className="text-white text-xl leading-none hover:opacity-70 ml-3"
              aria-label="Fechar atendimento"
            >
              ×
            </button>
          </div>

          {/* CONTEÚDO */}
          <div className="flex flex-col min-h-0">
            {/* MENSAGENS */}
            <div
              className="
                overflow-y-auto
                px-3
                pt-3
                pb-2
                space-y-2
                max-h-[260px]
              "
            >
              {chatMessages.map((msg, index) => (
                <div
                  key={`${msg.from}-${index}`}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[88%]
                      px-3
                      py-2.5
                      rounded-2xl
                      text-sm
                      whitespace-pre-line
                      leading-relaxed
                      ${
                        msg.from === "user"
                          ? "text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }
                    `}
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
            <div className="px-3 pt-2 pb-3 bg-white shrink-0">
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: "#0E2C45" }}
              >
                Serviços de vistos e passaportes
              </p>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleQuickQuestion(question)}
                    className="
                      text-xs
                      px-3
                      py-2
                      rounded-full
                      border
                      transition-all
                      hover:-translate-y-0.5
                    "
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

            {/* RODAPÉ */}
            <div
              className="
                px-3
                pt-2
                pb-3
                bg-white
                border-t
                border-gray-100
                shrink-0
              "
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  onKeyDown={handleChatInputKeyDown}
                  placeholder="Digite sua dúvida..."
                  className="
                    flex-1
                    min-w-0
                    border
                    border-gray-300
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    focus:outline-none
                  "
                  style={{
                    borderColor: "#0E2C4530",
                  }}
                />

                <button
                  type="button"
                  onClick={handleSendChat}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    text-white
                    text-sm
                    font-semibold
                  "
                  style={{
                    backgroundColor: "#0E2C45",
                  }}
                >
                  Enviar
                </button>
              </div>

              <button
                type="button"
                onClick={forwardConversationToWhatsApp}
                className="
                  w-full
                  mt-2
                  px-3
                  py-2.5
                  rounded-lg
                  text-white
                  text-sm
                  font-semibold
                  transition-opacity
                  hover:opacity-90
                "
                style={{
                  backgroundColor: "#25D366",
                }}
              >
                Continuar no WhatsApp
              </button>
            </div>
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
