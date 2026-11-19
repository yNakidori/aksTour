import React, { useState } from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const WEB3FORMS_ACCESS_KEY = "f9b4cdf4-0581-4f62-bc77-4a8a1692e09c";
const WHATSAPP_NUMBER = "5511957700305";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de conversar com a equipe da AKS Tur sobre uma viagem.")}`;

function ArrowIcon({ diagonal = false, className = "w-4 h-4" }) {
  return diagonal ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

function Field({ label, id, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: palette.navy }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldClass =
  "w-full border-0 border-b rounded-none px-0 py-3 text-[15px] bg-transparent outline-none transition-colors duration-200 placeholder:text-[#0E2C4566] focus:border-[#B78E46] focus:ring-0";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("access_key", WEB3FORMS_ACCESS_KEY);
    formData.set("subject", "Novo contato pelo site da AKS Tur");
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          "Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.",
        );
      }
      form.reset();
      setStatus("success");
      setMessage(
        "Mensagem enviada! Nossa equipe entrará em contato assim que possível.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar. Tente novamente.",
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale, color: palette.navy }}
    >
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24">
        <section
          className="relative overflow-hidden border-b"
          style={{ borderColor: `${palette.navy}16` }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 md:pt-24 pb-14 md:pb-20">
            <div className="flex items-center gap-3 mb-7">
              <span
                className="h-px w-9"
                style={{ backgroundColor: palette.gold }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: palette.gold }}
              >
                A conversa começa aqui
              </span>
            </div>
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 lg:gap-16 items-end">
              <h1
                className="max-w-[780px] text-[clamp(3.1rem,7vw,6.8rem)] leading-[0.98] tracking-[-0.045em]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 400,
                }}
              >
                Vamos planejar sua{" "}
                <em className="font-normal" style={{ color: palette.gold }}>
                  próxima história.
                </em>
              </h1>
              <div className="lg:pb-3">
                <p
                  className="text-base md:text-lg leading-[1.8] max-w-md"
                  style={{ color: `${palette.navy}BB` }}
                >
                  Uma boa viagem começa com uma boa conversa. Conte o que você
                  tem em mente e nós ajudamos a encontrar o próximo caminho.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 mt-7 pb-2 border-b text-sm font-semibold transition-colors hover:text-[#B78E46]"
                  style={{ borderColor: palette.gold }}
                >
                  Prefere falar pelo WhatsApp?
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute right-[-7rem] top-[-9rem] w-80 h-80 rounded-full pointer-events-none opacity-40"
            style={{ border: `1px solid ${palette.gold}30` }}
            aria-hidden="true"
          />
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-24">
            <aside>
              <div className="flex gap-3 items-center mb-8">
                <span
                  className="text-xs font-semibold tracking-[0.22em]"
                  style={{ color: palette.gold }}
                >
                  01 / CONTATO DIRETO
                </span>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: `${palette.navy}20` }}
                />
              </div>
              <h2
                className="text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Do seu jeito, no seu tempo.
              </h2>
              <p
                className="mt-5 text-[15px] leading-7 max-w-md"
                style={{ color: `${palette.navy}AA` }}
              >
                Escolha o canal mais conveniente. Nossa equipe pode orientar
                você sobre roteiros, reservas, vistos e documentação de viagem.
              </p>

              <div
                className="mt-11 border-t"
                style={{ borderColor: `${palette.navy}22` }}
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-6 border-b"
                  style={{ borderColor: `${palette.navy}22` }}
                >
                  <div>
                    <span
                      className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
                      style={{ color: palette.gold }}
                    >
                      Atendimento direto
                    </span>
                    <span className="text-lg font-medium">WhatsApp</span>
                    <span
                      className="block text-xs mt-1"
                      style={{ color: `${palette.navy}99` }}
                    >
                      Converse com nossa equipe
                    </span>
                  </div>
                  <span
                    className="w-11 h-11 flex items-center justify-center rounded-full border transition-colors group-hover:bg-[#0E2C45] group-hover:text-white"
                    style={{ borderColor: `${palette.navy}30` }}
                  >
                    <ArrowIcon diagonal />
                  </span>
                </a>
                <a
                  href="mailto:contato@akstur.com.br"
                  className="group flex items-center justify-between py-6 border-b"
                  style={{ borderColor: `${palette.navy}22` }}
                >
                  <div>
                    <span
                      className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
                      style={{ color: palette.gold }}
                    >
                      Por e-mail
                    </span>
                    <span className="text-lg font-medium break-all">
                      contato@akstur.com.br
                    </span>
                    <span
                      className="block text-xs mt-1"
                      style={{ color: `${palette.navy}99` }}
                    >
                      Para informações e solicitações
                    </span>
                  </div>
                  <span
                    className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border transition-colors group-hover:bg-[#0E2C45] group-hover:text-white"
                    style={{ borderColor: `${palette.navy}30` }}
                  >
                    <ArrowIcon diagonal />
                  </span>
                </a>
                <div
                  className="py-6 border-b"
                  style={{ borderColor: `${palette.navy}22` }}
                >
                  <span
                    className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-3"
                    style={{ color: palette.gold }}
                  >
                    Acompanhe a AKS Tur
                  </span>
                  <InstagramPost />
                </div>
              </div>

              <div
                className="mt-10 pl-5 border-l-2"
                style={{ borderColor: palette.gold }}
              >
                <h3 className="text-sm font-semibold mb-3">
                  Horário de atendimento
                </h3>
                <dl
                  className="space-y-2 text-sm"
                  style={{ color: `${palette.navy}BB` }}
                >
                  <div className="flex justify-between gap-6">
                    <dt>Segunda a sexta</dt>
                    <dd className="font-medium">8h às 18h</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Sábado</dt>
                    <dd className="font-medium">9h às 18h</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt>Domingo</dt>
                    <dd className="font-medium">9h às 13h</dd>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="lg:pl-3">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xs font-semibold tracking-[0.22em]"
                  style={{ color: palette.gold }}
                >
                  02 / ENVIE SUA MENSAGEM
                </span>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: `${palette.navy}20` }}
                />
              </div>
              <div
                className="bg-white border p-7 sm:p-10 md:p-12"
                style={{
                  borderColor: `${palette.navy}12`,
                  boxShadow: "0 18px 55px rgba(14,44,69,0.045)",
                }}
              >
                <h2
                  className="text-3xl md:text-4xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Conte-nos seus planos.
                </h2>
                <p
                  className="mt-3 mb-10 text-sm leading-7"
                  style={{ color: `${palette.navy}A0` }}
                >
                  Preencha os campos abaixo e nossa equipe responderá pelo
                  e-mail informado.
                </p>
                <form onSubmit={onSubmit} className="space-y-8">
                  <Field label="Seu nome *" id="contact-name">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder="Como podemos chamar você?"
                      className={fieldClass}
                      style={{
                        borderColor: `${palette.navy}35`,
                        color: palette.navy,
                      }}
                    />
                  </Field>
                  <Field label="E-mail *" id="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="seu@email.com"
                      className={fieldClass}
                      style={{
                        borderColor: `${palette.navy}35`,
                        color: palette.navy,
                      }}
                    />
                  </Field>
                  <Field label="Assunto" id="contact-topic">
                    <select
                      id="contact-topic"
                      name="topic"
                      defaultValue=""
                      className={`${fieldClass} cursor-pointer`}
                      style={{
                        borderColor: `${palette.navy}35`,
                        color: palette.navy,
                      }}
                    >
                      <option value="" disabled>
                        Sobre o que gostaria de conversar?
                      </option>
                      <option value="Pacotes e destinos">
                        Pacotes e destinos
                      </option>
                      <option value="Vistos e documentação">
                        Vistos e documentação
                      </option>
                      <option value="Passagens e reservas">
                        Passagens e reservas
                      </option>
                      <option value="Outros assuntos">Outros assuntos</option>
                    </select>
                  </Field>
                  <Field label="Sua mensagem *" id="contact-message">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Fale um pouco sobre o que você procura..."
                      className={`${fieldClass} resize-y min-h-[130px]`}
                      style={{
                        borderColor: `${palette.navy}35`,
                        color: palette.navy,
                      }}
                    />
                  </Field>
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-8 px-8 py-4 font-semibold text-sm transition-colors hover:bg-[#B78E46] disabled:opacity-60 disabled:cursor-wait focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ backgroundColor: palette.navy, color: "white" }}
                    >
                      {status === "sending"
                        ? "Enviando mensagem..."
                        : "Enviar mensagem"}
                      <span className="transition-transform group-hover:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </button>
                    {message && (
                      <p
                        role="status"
                        aria-live="polite"
                        className="text-sm leading-6"
                        style={{
                          color: status === "error" ? "#A33B35" : "#23694D",
                        }}
                      >
                        {message}
                      </p>
                    )}
                    <p
                      className="text-xs leading-5"
                      style={{ color: `${palette.navy}88` }}
                    >
                      Seus dados serão usados apenas para responder à sua
                      solicitação.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t"
          style={{
            backgroundColor: palette.navy,
            borderColor: `${palette.gold}40`,
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div>
              <span
                className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: palette.gold }}
              >
                AKS Tur
              </span>
              <h2
                className="text-3xl md:text-5xl mt-3 leading-tight text-white"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Sua próxima viagem começa aqui.
              </h2>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-5 px-7 py-4 shrink-0 text-sm font-semibold transition-colors hover:bg-white"
              style={{ backgroundColor: palette.gold, color: palette.navy }}
            >
              Conversar com um especialista{" "}
              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon diagonal />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
