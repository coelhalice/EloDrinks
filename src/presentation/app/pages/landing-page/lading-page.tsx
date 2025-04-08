export const LandingPage = () => {
    return (
      <section className="relative w-full bg-[url('/fundo1.png')]  bg-center p-8 text-secondary overflow-y-scroll">
        
        <header className="mx-auto mb-20 flex max-w-[972px] items-center justify-between">
          <span className="cursor-pointer text-sm hover:underline">INÍCIO</span>
          <span className="cursor-pointer text-sm hover:underline">SERVIÇO</span>
          <img src="/logo.svg" alt="Logo" className="h-16" />
          <span className="cursor-pointer text-sm hover:underline">ORÇAMENTO</span>
          <span className="cursor-pointer text-sm hover:underline">CONTATO</span>
        </header>
  
        {/* Overlay escura */}
        <div className="absolute inset-0 bg-black/30 z-0" />
  
        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 text-secondary">
          <h1 className="mb-8 mt-20 text-3xl font-bold italic leading-tight md:text-5xl">
            JOGA O COPO PRO ALTO <br /> VAMO BEBER!!
          </h1>
  
          <button className="rounded-full bg-[#9E430E] px-6 py-3 text-secondary transition-opacity duration-300 hover:opacity-90">
            Monte seu orçamento agora!
          </button>
        </div>
      </section>
    );
  };  