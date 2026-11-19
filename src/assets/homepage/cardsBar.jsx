import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import destinations from "./destinationsData";

// Mesma paleta do componente original.
const palette = {
  navy: "#0E2C45",
  gold: "#B78E46",
  pale: "#F6FBF8",
  subtle: "#E6F0EC",
};

function ArrowIcon({ diagonal = false, size = 18 }) {
  return diagonal ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16m-7-7 7 7-7 7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = selectedCard
    ? selectedCard.images?.length
      ? selectedCard.images
      : [selectedCard.image]
    : [];

  const openDestination = (dest) => {
    setSelectedCard(dest);
    setSelectedImageIndex(0);
  };

  const closeDestination = () => {
    setSelectedCard(null);
    setSelectedImageIndex(0);
  };

  useEffect(() => {
    if (!selectedCard) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeDestination();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedCard]);

  const contactViaWhatsApp = () => {
    if (!selectedCard) return;
    const message = `Olá! Tenho interesse em conhecer o destino: ${selectedCard.title}. Gostaria de saber mais informações.`;
    const url = `https://wa.me/5511957700305?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: palette.pale }}
    >
      {/* Linhas editoriais discretas, sem efeito de 'cartão genérico'. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: `${palette.navy}12` }}
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <header
          className="mb-10 flex flex-col justify-between gap-7 border-b pb-8 md:mb-12 md:flex-row md:items-end"
          style={{ borderColor: `${palette.navy}20` }}
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-9"
                style={{ backgroundColor: palette.gold }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: palette.gold }}
              >
                Explore com a AKS Tur
              </span>
            </div>
            <h2
              className="font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[1.08] tracking-[-0.035em]"
              style={{ color: palette.navy }}
            >
              Lugares que merecem{" "}
              <span className="italic" style={{ color: palette.gold }}>
                ser vividos.
              </span>
            </h2>
            <p
              className="mt-5 max-w-xl text-[15px] leading-7 sm:text-base"
              style={{ color: `${palette.navy}B8` }}
            >
              Uma seleção de destinos para transformar sua próxima viagem em uma
              experiência memorável.
            </p>
          </div>
          <div
            className="flex shrink-0 items-center gap-3 pb-1 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: palette.navy }}
          >
            <span
              className="text-xl font-serif"
              style={{ color: palette.gold }}
            >
              {String(destinations.length).padStart(2, "0")}
            </span>
            Destinos para descobrir
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {destinations.map((dest, index) => (
            <motion.button
              type="button"
              key={dest.id ?? `${dest.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index, 5) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => openDestination(dest)}
              className={`group relative isolate block h-[390px] w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:h-[440px] ${index === 0 ? "sm:col-span-2 xl:col-span-2" : ""}`}
              style={{
                outlineColor: palette.gold,
                backgroundColor: palette.navy,
              }}
              aria-label={`Ver detalhes de ${dest.title}`}
            >
              <img
                src={dest.image}
                alt={dest.title}
                loading={index < 3 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.055]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B2C]/95 via-[#071B2C]/20 to-[#071B2C]/10" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: `${palette.navy}25` }}
              />

              <div className="absolute left-6 top-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:left-7 sm:top-7">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: palette.gold }}
                />
                {index === 0
                  ? "Em destaque"
                  : `Destino ${String(index + 1).padStart(2, "0")}`}
              </div>

              <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-[#0E2C45] sm:right-7 sm:top-7">
                <ArrowIcon diagonal size={18} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7 md:p-8">
                <div className="mb-3 flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/75">
                  <PinIcon /> {dest.location}
                </div>
                <h3
                  className={`max-w-[440px] font-serif font-normal leading-[1.08] tracking-tight ${index === 0 ? "text-4xl md:text-5xl" : "text-[32px]"}`}
                >
                  {dest.title}
                </h3>
                <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/30 pt-5">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-white/60">
                      A partir de
                    </span>
                    <span className="mt-1 block text-xl font-semibold tracking-tight sm:text-2xl">
                      {dest.price}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    Explorar <ArrowIcon size={16} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div
          className="mt-8 flex items-center gap-4 text-xs"
          style={{ color: `${palette.navy}99` }}
        >
          <span
            className="h-px w-8"
            style={{ backgroundColor: palette.gold }}
          />
          Seu próximo capítulo começa aqui.
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061827]/80 p-3 backdrop-blur-[6px] sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDestination();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="destination-dialog-title"
              initial={{ opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[94vh] w-full max-w-[1150px] grid-cols-1 overflow-y-auto bg-white shadow-2xl lg:max-h-[88vh] lg:grid-cols-[1.1fr_0.9fr] lg:overflow-hidden"
            >
              <button
                type="button"
                onClick={closeDestination}
                aria-label="Fechar detalhes"
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0E2C45] shadow-lg transition-transform hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-6 sm:top-6"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5 5 19 19M19 5 5 19" />
                </svg>
              </button>

              {/* Galeria com miniaturas: elimina controles duplicados sobre a fotografia. */}
              <div className="flex min-h-[330px] flex-col bg-[#0E2C45] lg:min-h-0">
                <div className="relative h-[300px] overflow-hidden sm:h-[430px] lg:h-auto lg:min-h-0 lg:flex-1">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImageIndex}
                      src={images[selectedImageIndex] || images[0]}
                      alt={`${selectedCard.title} — imagem ${selectedImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.025 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071B2C]/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-8 sm:left-8">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                      Explore o destino
                    </span>
                    <span className="font-serif text-xl">
                      {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                      {String(images.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                {images.length > 1 && (
                  <div className="flex shrink-0 gap-2 overflow-x-auto p-3 sm:gap-3 sm:p-4">
                    {images.map((img, index) => (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        aria-label={`Exibir imagem ${index + 1}`}
                        aria-pressed={selectedImageIndex === index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-[64px] w-[84px] shrink-0 overflow-hidden border-2 transition-opacity sm:h-[74px] sm:w-[96px] ${selectedImageIndex === index ? "opacity-100" : "border-transparent opacity-55 hover:opacity-90"}`}
                        style={{
                          borderColor:
                            selectedImageIndex === index
                              ? palette.gold
                              : "transparent",
                        }}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações sem badges de disponibilidade ou garantias não verificadas. */}
              <div
                className="flex flex-col overflow-y-visible lg:max-h-[88vh] lg:overflow-y-auto"
                style={{ backgroundColor: palette.pale }}
              >
                <div className="flex-1 px-6 pb-8 pt-10 sm:px-10 sm:pt-12 lg:px-12 lg:pt-16">
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="h-px w-7"
                      style={{ backgroundColor: palette.gold }}
                    />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: palette.gold }}
                    >
                      Conheça este destino
                    </span>
                  </div>
                  <h2
                    id="destination-dialog-title"
                    className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-normal leading-[1.04] tracking-[-0.03em]"
                    style={{ color: palette.navy }}
                  >
                    {selectedCard.title}
                  </h2>
                  <div
                    className="mt-5 flex items-center gap-2 text-sm"
                    style={{ color: `${palette.navy}B0` }}
                  >
                    <PinIcon /> {selectedCard.location}
                  </div>
                  <div
                    className="my-8 h-px w-full"
                    style={{ backgroundColor: `${palette.navy}23` }}
                  />

                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: palette.gold }}
                  >
                    A experiência
                  </p>
                  <p
                    className="mt-4 whitespace-pre-line text-[15px] leading-[1.9]"
                    style={{ color: `${palette.navy}C9` }}
                  >
                    {selectedCard.description}
                  </p>
                </div>
                <div
                  className="border-t px-6 py-7 sm:px-10 lg:px-12"
                  style={{
                    borderColor: `${palette.navy}1F`,
                    backgroundColor: "white",
                  }}
                >
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: `${palette.navy}9C` }}
                      >
                        Valor a partir de
                      </p>
                      <p
                        className="text-3xl font-semibold tracking-tight"
                        style={{ color: palette.navy }}
                      >
                        {selectedCard.price}
                      </p>
                    </div>
                    <span
                      className="mb-1 text-xs"
                      style={{ color: `${palette.navy}99` }}
                    >
                      Consulte condições
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={contactViaWhatsApp}
                    className="group flex w-full items-center justify-between px-5 py-4 text-sm font-semibold transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      backgroundColor: palette.gold,
                      color: "white",
                      outlineColor: palette.navy,
                    }}
                  >
                    Solicitar informações pelo WhatsApp
                    <ArrowIcon size={20} />
                  </button>
                  <p
                    className="mt-3 text-center text-[11px]"
                    style={{ color: `${palette.navy}85` }}
                  >
                    Atendimento personalizado para planejar sua viagem.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardsBar;
