import "./App.css";
import { useState } from "react";
import Navbar from "./assets/navbar";
import BannerCarousel from "./assets/BannerCarousel";
import CardsBar from "./assets/homepage/cardsBar";
import AccommodationList from "./assets/admin/AccommodationList";
import Savan from "./assets/homepage/savan";
import EuroTuor from "./assets/homepage/euroTuor";
import Featured from "./assets/homepage/featured";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
import Whats from "./assets/whats";
import ReactiveButton from "reactive-button";
import Lottie from "react-lottie";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      from: "bot",
      text: "Oi! Eu sou o assistente da AKSTur. Posso ajudar com destinos, hospedagens, pacotes e suporte.",
    },
  ]);

  const quickQuestions = [
    "Quero ver promoções",
    "Preciso de hospedagem",
    "Tenho interesse em cruzeiro",
    "Falar com atendente",
  ];

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";

  const getBotReply = (message) => {
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

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
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

  const handleWhatsAppClick = () => {
    const conversation = chatMessages
      .map((msg) => `${msg.from === "bot" ? "AKS" : "Cliente"}: ${msg.text}`)
      .join("\n");
    const whatsappText = encodeURIComponent(
      `Olá! Segue meu histórico do mini chat:\n\n${conversation}`,
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className=" ">
      <BannerCarousel />
      <Navbar />
      <div className="container mx-auto pt-20">
        <CardsBar />
      </div>

      <div className="container mx-auto">
        <Savan />
      </div>
      <div className="container mx-auto">
        <EuroTuor />
      </div>
      <div className="container mx-auto">
        <Featured />
      </div>

      {/* TÍTULO ANTES DA LISTA DE HOSPEDAGENS */}
      <div className="container mx-auto">
        <div className="text-center mt-10 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Confira aqui algumas das nossas opções de hospedagem!
          </h1>
          <div className="h-1 w-16 bg-pink-600 mx-auto mt-2 mb-6"></div>
        </div>
        <AccommodationList isAdmin={false} />
      </div>

      {/* NOVA SEÇÃO: Quem Somos */}
      <div className="container mx-auto my-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quem somos</h2>
        <div className="h-1 w-16 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Somos uma agência especializada em criar experiências inesquecíveis.
          Seja uma viagem de férias, intercâmbio ou hospedagens exclusivas,
          nosso compromisso é com a sua satisfação e segurança. Conheça nossos
          destinos e venha viajar com tranquilidade!
        </p>
      </div>

      {/* NOVA SEÇÃO: Destaques da Semana */}
      <div className="container mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Destaques
        </h2>
        <div className="h-1 w-16 bg-yellow-500 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Promoções Relâmpago</h3>
            <p className="text-gray-600">
              Aproveite ofertas especiais em destinos selecionados por tempo
              limitado.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Destinos Exóticos</h3>
            <p className="text-gray-600">
              Descubra lugares fora do comum com pacotes exclusivos e
              personalizados.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
            <p className="text-gray-600">
              Nossa equipe está sempre disponível para te ajudar, antes, durante
              e depois da viagem.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <Companys />
      </div>
      <div className="container mx-auto">
        <Clients />
      </div>

      {/* NOVA SEÇÃO: Depoimento de Cliente */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            O que dizem nossos viajantes
          </h2>
          <div className="h-1 w-16 bg-green-500 mx-auto mb-6"></div>
          <div className="max-w-4xl mx-auto">
            <p className="italic text-gray-700 text-lg">
              “A melhor experiência que já tive! Tudo muito organizado,
              atendimento rápido e destinos incríveis. Recomendo para todos que
              querem viajar com tranquilidade.”
            </p>
            <span className="block mt-4 font-semibold text-gray-800">
              — Mariana Costa
            </span>
          </div>
        </div>
      </div>

      {/* Mini chat flutuante */}
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
              onClick={handleWhatsAppClick}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold"
            >
              Continuar no WhatsApp
            </button>
          </div>
        </div>
      )}

      <div
        className="fixed bottom-5 right-5 z-50 cursor-pointer"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>

      {/* CHAMADA FINAL */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Clique aqui e saiba tudo sobre as nossas oportunidades!
        </h1>
        <div className="h-1 w-16 bg-cyan-500 mx-auto mt-2 mb-6"></div>
      </div>
      <div className="items-center justify-center flex mb-8">
        <ReactiveButton
          idleText="Quero conhecer!"
          color="primary"
          size="large"
          rounded
          shadow
          onClick={openChat}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
