import React, { useState } from "react";
import logo from "../assets/akslogo.png";
// import { Link } from "react-router-dom"; // Link não utilizado

const Footer = () => {
  const [showModal, setShowModal] = useState(null);

  // Palette derived from provided image
  const palette = {
    navy: "#0E2C45",
    gold: "#B78E46",
    pale: "#F6FBF8",
    subtle: "#E6F0EC",
  };

  const closeModal = () => setShowModal(null);

  return (
    <footer
      className=""
      style={{ backgroundColor: palette.navy, color: palette.pale }}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="logo" width="80" className="rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <h2
                className="mb-6 text-sm font-semibold uppercase"
                style={{ color: palette.gold }}
              >
                Acompanhe a AKSTUR
              </h2>
              <ul className="font-medium" style={{ color: palette.subtle }}>
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/_akstur?igsh=MTBrcDR4M2ZvYmtpNg=="
                    className="hover:underline"
                    style={{ color: palette.pale }}
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-6">
              <h2
                className="mb-6 text-sm font-semibold uppercase"
                style={{ color: palette.gold }}
              >
                Legal
              </h2>
              <ul className="font-medium" style={{ color: palette.subtle }}>
                <li className="mb-4">
                  <button
                    className="hover:underline"
                    onClick={() => setShowModal("privacy")}
                  >
                    Políticas de Privacidade
                  </button>
                </li>
                <li className="mb-4">
                  <button
                    className="hover:underline"
                    onClick={() => setShowModal("terms")}
                  >
                    Termos de Uso
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          className="my-6 sm:mx-auto lg:my-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span
            className="text-sm sm:text-center"
            style={{ color: palette.subtle }}
          >
            © 2025
            <a
              href="/"
              className="hover:underline"
              style={{ color: palette.pale }}
            >
              AKSTUR™
            </a>
            . Todos os direitos reservados.
          </span>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="rounded-lg shadow-lg p-6 w-11/12 max-w-2xl relative"
            style={{ backgroundColor: palette.pale, color: palette.navy }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              onClick={closeModal}
            >
              ×
            </button>
            {showModal === "privacy" && (
              <div>
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: palette.navy }}
                >
                  Políticas de Privacidade
                </h2>
                <p className="mb-4" style={{ color: palette.navy }}>
                  Nós da AKSTUR respeitamos sua privacidade e estamos
                  comprometidos em protegê-la. As informações coletadas são
                  utilizadas para melhorar sua experiência em nossos serviços.
                  Nenhum dado pessoal será compartilhado com terceiros sem seu
                  consentimento, exceto quando exigido por lei. Para mais
                  detalhes, entre em contato conosco.
                </p>
              </div>
            )}
            {showModal === "terms" && (
              <div>
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ color: palette.navy }}
                >
                  Termos de Uso
                </h2>
                <p className="mb-4" style={{ color: palette.navy }}>
                  Ao utilizar nossos serviços, você concorda em cumprir todas as
                  leis e regulamentos aplicáveis. É proibido utilizar a
                  plataforma para qualquer atividade ilegal ou não autorizada.
                  Reservamo-nos o direito de modificar estes termos a qualquer
                  momento, notificando os usuários previamente.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
