import { Header } from "@/components/internal/header";
import { Footer } from "./footer";
import MidContent from "./mid-content";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
      <>
        <section role="main" className="w-full h-lvh bg-[url('/fundo1.png')] flex flex-col items-center bg-center min-h-screen py-5 px-4 text-secondary">

          <Header />

          <div className="gap-10 z-10 flex flex-col items-center justify-center text-center px-4 text-secondary">
            <h1 className="mb-8 mt-20 text-3xl font-bold italic leading-tight md:text-5xl">
              JOGA O COPO PRO ALTO <br /> VAMO BEBER!!
            </h1>
    
            <button onClick={() => navigate('/orcamento')} className="relative hover:-top-2 rounded-full text-lg font-bold bg-[#9E430E] px-6 py-3 text-secondary transition-opacity duration-300 hover:opacity-90">
              Monte seu orçamento agora!
            </button>
          </div>
        </section>
        <MidContent />
        <Footer />
      </>
    );
  };  