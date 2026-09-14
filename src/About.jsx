import React from "react";
import Navbar from "./assets/navbar";
import Foto from "./assets/images/Andreia.jpeg";
import {
  Plane,
  Globe,
  ShieldCheck,
  Headphones,
  FileCheck2,
  CheckCircle2,
  MessageCircle,
  Instagram,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#F8F3E9] text-[#24303B]">
      <Navbar />

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-[1.15fr_0.95fr]">
        {/* LEFT: copy */}
        <div className="px-6 py-14 md:px-16 md:py-20">
          <h1
            className="text-[#0F2438] text-4xl md:text-5xl font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Sobre nós
          </h1>
          <p
            className="italic text-[#0F2438] text-lg mb-5"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Mais do que uma viagem. Cuidado em cada etapa do caminho.
          </p>
          <hr className="w-20 h-0.5 bg-[#C0995E] border-0 mb-7" />

          <div className="max-w-[46ch] space-y-5 text-[15.5px] text-[#40505E]">
            <p>
              A AKSTUR nasceu da paixão por viagens e do propósito de
              transformar planos em experiências incríveis, com segurança,
              organização e tranquilidade.
            </p>
            <p>
              Minha própria experiência ao solicitar o visto americano, que foi
              negado na primeira tentativa, me ensinou o quanto esse processo
              pode gerar dúvidas e insegurança. Após estudar, me preparar e
              realizar uma nova solicitação, meu visto foi aprovado.
            </p>
            <p>
              Foi essa vivência que me motivou a me especializar em assessoria
              para vistos consulares e passaportes brasileiros, unindo
              conhecimento e experiência à minha paixão pelo turismo.
            </p>
            <p>
              Hoje, a AKSTUR oferece um atendimento próximo e personalizado,
              auxiliando você na organização de seus processos de vistos e
              passaportes e também no planejamento da sua viagem — com passagens
              aéreas, hospedagens, traslados, seguro viagem, passeios, pacotes
              personalizados e muito mais.
            </p>
          </div>

          <div className="flex gap-3 items-start mt-8 mb-7 p-5 bg-white border border-[#E4D9C2] rounded max-w-[46ch]">
            <CheckCircle2
              size={20}
              className="text-[#C0995E] shrink-0 mt-0.5"
            />
            <p className="text-sm text-[#0F2438] m-0">
              <strong className="font-semibold">
                Nosso compromisso é com você:
              </strong>{" "}
              transparência, responsabilidade e atenção aos detalhes em cada
              etapa.
            </p>
          </div>

          <div className="flex gap-2 items-start max-w-[44ch]">
            <Heart size={16} className="text-[#C0995E] shrink-0 mt-0.5" />
            <p
              className="italic text-[17px] text-[#0F2438] m-0"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Porque acreditamos que uma grande viagem começa muito antes do
              embarque.
            </p>
          </div>
        </div>

        {/* RIGHT: photo panel */}
        <div className="relative min-h-[480px] md:min-h-[640px] bg-[#0F2438] flex items-end justify-center overflow-hidden">
          <img
            src={Foto}
            alt="Andreia K. Sampaio"
            className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
          />
          {/* gradiente sutil para o cartão do nome ficar legível sobre a foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A29] via-[#0A1A29]/10 to-transparent" />

          <div className="relative z-10 mx-auto mb-8 w-[88%] bg-[#0A1A29]/95 backdrop-blur-sm border border-[#C0995E]/40 rounded p-6 text-center">
            <p
              className="italic text-2xl text-[#E4D3AC] mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Andreia K. Sampaio
            </p>
            <p className="text-xs tracking-[3px] text-[#F1E9D6] font-semibold mb-3">
              FUNDADORA DA AKSTUR
            </p>
            <hr className="w-10 h-px bg-[#C0995E] border-0 mx-auto mb-3" />
            <p className="text-xs text-[#B9C3CC] m-0">
              Assessoria em Vistos, Passaportes e Viagens
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="bg-[#0F2438] flex flex-wrap justify-center">
        {[
          { icon: Globe, label: "VISTOS CONSULARES" },
          { icon: FileCheck2, label: "PASSAPORTES BRASILEIROS" },
          { icon: Plane, label: "PACOTES DE VIAGEM" },
          { icon: ShieldCheck, label: "ASSESSORIA COMPLETA" },
          { icon: Headphones, label: "ATENDIMENTO PERSONALIZADO" },
        ].map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className={`flex-1 min-w-[180px] flex flex-col items-center gap-2.5 text-center py-8 px-5 ${
              i !== 4 ? "border-r border-white/10" : ""
            }`}
          >
            <Icon size={30} strokeWidth={1.6} className="text-[#C0995E]" />
            <span className="text-[13px] font-semibold tracking-wide text-[#F3EEE1]">
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A1A29] py-6 px-10 flex flex-wrap gap-6 items-center justify-center text-[#EFE7D3]">
        <div className="flex items-center gap-2.5 text-sm">
          <MessageCircle
            size={22}
            strokeWidth={1.8}
            className="text-[#C0995E]"
          />
          <div>
            <span className="block text-[10.5px] tracking-wide text-[#9AA7B1]">
              FALE COM A AKSTUR
            </span>
            <span className="font-semibold">11 95770-0305</span>
          </div>
        </div>
        <div className="hidden sm:block w-px h-6 bg-white/15" />
        <div className="flex items-center gap-2.5 text-sm">
          <Instagram size={22} strokeWidth={1.8} className="text-[#C0995E]" />
          <span className="font-semibold">@_akstur</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-white/15" />
        <div className="flex items-center gap-2.5 text-sm">
          <Globe size={22} strokeWidth={1.8} className="text-[#C0995E]" />
          <span className="font-semibold">www.akstur.com.br</span>
        </div>
      </footer>

      <div className="bg-[#0A1A29] text-center py-4 pb-6 text-[11px] tracking-[3px] text-[#E4D3AC] border-t border-white/10">
        AKSTUR — SEU DESTINO, NOSSA MISSÃO.
      </div>
    </div>
  );
};

export default About;
