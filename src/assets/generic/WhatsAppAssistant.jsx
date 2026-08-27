import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Lottie from "react-lottie";
import Whats from "../whats.json";

const defaultQuickQuestions = [
  "Quero ver promoções",
  "Preciso de hospedagem",
  "Tenho interesse em cruzeiro",
  "Falar com atendente",
];

const defaultIntroMessage =
  "Oi! Eu sou o assistente da AKSTur. Posso ajudar com destinos, hospedagens, pacotes e suporte.";

const defaultGetBotReply = (message) => {
  const normalized = message.toLowerCase();

  if (normalized.includes("promo") || normalized.includes("oferta")) {
    return "Temos promoções saindo toda semana. Me conta o destino que você quer e eu te passo as melhores opções.";
  }

  if (
    normalized.includes("hosped") ||
    normalized.includes("hotel") ||
    normalized.includes("acomoda")
  ) {
    return "Perfeito. Buscamos hospedagens com ótimo custo-benefício. Me diga cidade e datas aproximadas.";
  }

  if (normalized.includes("cruzeiro")) {
    return "Excelente escolha. Trabalhamos com rotas nacionais e internacionais. Você prefere viagem curta ou longa?";
  }

  if (
    normalized.includes("atendente") ||
    normalized.includes("humano") ||
    normalized.includes("pessoa")
  ) {
    return "Claro. Posso organizar sua solicitação aqui e em seguida te conecto ao nosso atendimento no WhatsApp.";
  }

  return "Entendi. Se quiser, posso te ajudar a montar um roteiro agora e depois enviar tudo para nosso atendimento.";
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
      `Olá! Segue meu histórico do mini chat:\n\n${conversation}`,
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
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold">AKSTur Chat</h3>
              <p className="text-xs opacity-90">Atendimento inicial online</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="text-white text-lg leading-none"
            >
              x
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {chatMessages.map((msg, index) => (
              <div
                key={`${msg.from}-${index}`}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    msg.from === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-2 bg-white border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={handleChatInputKeyDown}
                placeholder="Digite sua mensagem"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={handleSendChat}
                className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
              >
                Enviar
              </button>
            </div>

            <button
              type="button"
              onClick={forwardConversationToWhatsApp}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold"
            >
              Continuar no WhatsApp
            </button>
          </div>
        </div>
      )}

      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer"
        onClick={toggleChat}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
    </>
  );
});

export default WhatsAppAssistant;
