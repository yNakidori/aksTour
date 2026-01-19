import React, { useState } from "react";
import logo from "../assets/akslogo.png";
// import { Link } from "react-router-dom"; // Link não utilizado

const Footer = () => {
  const [showModal, setShowModal] = useState(null);

  const closeModal = () => setShowModal(null);

  return (
    <footer className="" style={{ backgroundColor: "#102a43" }}>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="logo" width="80" className="rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-orange-400">
                Acompanhe a AKSTUR
              </h2>
              <ul className="text-gray-500 dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/_akstur?igsh=MTBrcDR4M2ZvYmtpNg=="
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-6">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-orange-400 ">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-300 font-medium">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-300 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025
            <a href="/" className="hover:underline">
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
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-2xl relative"
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
                <h2 className="text-xl font-bold mb-4">
                  Políticas de Privacidade
                </h2>
                <p className="text-gray-700 mb-4">
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
                <h2 className="text-xl font-bold mb-4">Termos de Uso</h2>
                <p className="text-gray-700 mb-4">
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
