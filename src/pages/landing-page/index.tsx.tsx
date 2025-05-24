import { Footer } from "./footer";
import MidContent from "./mid-content";

export const LandingPage = () => {
    return (
      <>
        <section className="w-full h-lvh bg-[url('/fundo1.png')] flex flex-col items-center bg-center p-8 text-secondary">

          <header className="flex flex-row items-center justify-around mb-8 px-10 text-xl w-full">
            <span className="cursor-pointer hover:underline w-[100px]">INÍCIO</span>
            <span className="cursor-pointer hover:underline w-[100px]">SERVIÇO</span>
            <img src="/logo.svg" alt="Logo" className="h-16 w-[100px]" />
            <span className="cursor-pointer hover:underline w-[100px]">ORÇAMENTO</span>
            <span className="cursor-pointer hover:underline w-[100px]">CONTATO</span>
          </header>
    
          <div className="gap-10 z-10 flex flex-col items-center justify-center text-center px-4 text-secondary">
            <h1 className="mb-8 mt-20 text-3xl font-bold italic leading-tight md:text-5xl">
              JOGA O COPO PRO ALTO <br /> VAMO BEBER!!
            </h1>
    
            <button className="relative hover:-top-2 rounded-full text-lg font-bold bg-[#9E430E] px-6 py-3 text-secondary transition-opacity duration-300 hover:opacity-90">
              Monte seu orçamento agora!
            </button>
          </div>
        </section>
        <MidContent />
        <Footer />
      </>
    );
  };  