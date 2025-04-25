import {
    Mail,
    Phone,
    Instagram,
    Facebook,
    X as Twitter,
  } from "lucide-react";
  
  export const Footer = () => {
    return (
      <footer className="bg-[#0A0F17] text-[#A8430C] px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-sm md:text-base">
          {/* Logo e slogan */}
          <div className="flex flex-col items-start gap-4">
            <img src="/slogo.svg" alt="Elo Drinks" className="h-36" />
          </div>
  
          {/* Contato */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">CONTATO</h3>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <a
                href="tel:+5511994663100"
                className="hover:underline"
              >
                (11) 99466-3100
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <a
                href="mailto:atendimento@elodrinks.com.br"
                className="hover:underline"
              >
                atendimento@elodrinks.com.br
              </a>
            </div>
          </div>
  
          {/* Redes Sociais */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">SIGA-NOS</h3>
            <div className="flex items-center gap-2">
              <Instagram size={18} />
              <span>@elodrinks</span>
            </div>
            <div className="flex items-center gap-2">
              <Facebook size={18} />
              <span>Elo Drinks e Eventos</span>
            </div>
            <div className="flex items-center gap-2">
              <Twitter size={18} />
              <span>@elodrinks</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  