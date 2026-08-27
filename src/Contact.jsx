import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import Swal from "sweetalert2";

const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: `1px solid ${palette.navy}22`,
  backgroundColor: "white",
  color: palette.navy,
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "f9b4cdf4-0581-4f62-bc77-4a8a1692e09c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Sucesso!",
        text: "Sua mensagem foi enviada com sucesso.",
        icon: "success",
      });
    }
  };

  const highlights = [
    {
      emoji: "⏱️",
      title: "Atendimento rápido",
      desc: "Respondemos em até 24 horas úteis.",
    },
    {
      emoji: "🧭",
      title: "Guiamos sua jornada",
      desc: "Oferecemos suporte em todas as etapas da sua viagem.",
    },
    {
      emoji: "🤝",
      title: "Equipe dedicada",
      desc: "Nosso time é apaixonado por transformar experiências em memórias.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: palette.pale }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: palette.navy }}
      >
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide uppercase border"
          style={{
            borderColor: `${palette.gold}55`,
            backgroundColor: `${palette.gold}20`,
            color: palette.gold,
          }}
        >
          Fale Conosco
        </span>
        <h1
          className="text-4xl sm:text-5xl font-extrabold mb-4"
          style={{ color: palette.pale }}
        >
          Entre em <span style={{ color: palette.gold }}>contato</span>
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: palette.subtle }}
        >
          Estamos prontos para responder suas dúvidas e ajudar a planejar sua
          próxima viagem.
        </p>
      </section>

      {/* Main content */}
      <section className="py-20 px-6" style={{ backgroundColor: palette.pale }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info card */}
          <div
            className="rounded-2xl p-10 flex flex-col justify-between border"
            style={{
              backgroundColor: palette.navy,
              borderColor: `${palette.gold}30`,
              boxShadow: "0 10px 40px rgba(14,44,69,0.12)",
            }}
          >
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: palette.pale }}
              >
                Informações de contato
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: palette.subtle }}
              >
                Preencha o formulário ou entre em contato diretamente por um dos
                canais abaixo.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      backgroundColor: `${palette.gold}22`,
                      border: `1px solid ${palette.gold}44`,
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest font-semibold mb-0.5"
                      style={{ color: palette.gold }}
                    >
                      Email
                    </p>
                    <p className="text-sm" style={{ color: palette.pale }}>
                      contato@akstur.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      backgroundColor: `${palette.gold}22`,
                      border: `1px solid ${palette.gold}44`,
                    }}
                  >
                    📸
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest font-semibold mb-0.5"
                      style={{ color: palette.gold }}
                    >
                      Instagram
                    </p>
                    <div style={{ color: palette.pale }}>
                      <InstagramPost />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-10 pt-8 border-t"
              style={{ borderColor: `${palette.pale}15` }}
            >
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: palette.gold }}
              >
                Horário de atendimento
              </p>
              <p className="text-sm" style={{ color: palette.subtle }}>
                Segunda a Sexta: 9h – 18h
              </p>
              <p className="text-sm" style={{ color: palette.subtle }}>
                Sábado: 9h – 13h
              </p>
            </div>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-10 border"
            style={{
              backgroundColor: "white",
              borderColor: `${palette.navy}15`,
              boxShadow: "0 4px 24px rgba(14,44,69,0.07)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: palette.navy }}
            >
              Envie sua mensagem
            </h2>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: palette.navy }}
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Seu nome"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = palette.gold)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = `${palette.navy}22`)
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: palette.navy }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = palette.gold)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = `${palette.navy}22`)
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: palette.navy }}
                >
                  Mensagem
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Como podemos ajudar?"
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = palette.gold)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = `${palette.navy}22`)
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: palette.gold, color: palette.pale }}
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: palette.subtle }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: palette.navy }}>
              Estamos aqui para você
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-center border transition-all duration-300"
                style={{
                  backgroundColor: "white",
                  borderColor: `${palette.navy}15`,
                  boxShadow: "0 4px 20px rgba(14,44,69,0.06)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 border"
                  style={{
                    backgroundColor: `${palette.gold}18`,
                    borderColor: `${palette.gold}40`,
                  }}
                >
                  {item.emoji}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: palette.navy }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: `${palette.navy}99` }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
