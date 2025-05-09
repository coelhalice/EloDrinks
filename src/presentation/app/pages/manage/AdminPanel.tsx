import { useState } from "react";
import { OrcamentoAdmin } from "../quote/admin-quote";
import { UsuariosAdmin } from "./usersAdmin";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export const AdminPanel = () => {
  const [view, setView] = useState<"orcamento" | "usuarios">("orcamento");
  const [sidemenuIsOpen, setSidemenuIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full bg-[#0A0F17] text-white">
      {/* Sidebar */}

      <aside  className={cn("hidden sm:block  w-64 bg-[#101820] p-6 space-y-4", sidemenuIsOpen && 'block')}>
        
          <XIcon className="text-secondary cursor-pointer sm:hidden " onClick={() => setSidemenuIsOpen(!sidemenuIsOpen)} />
        
        <img
          src="/plogo.svg"
          alt="Logo Elo Drinks"
          className="h-16 mx-auto mb-6"
        />

        <button
          onClick={() => setView("orcamento")}
          className={`w-full text-left px-4 py-2 rounded ${
            view === "orcamento"
              ? "bg-[#9E430E]"
              : "hover:bg-[#1a1a1a] text-[#F7F6F3]"
          }`}
        >
          Gerenciamento Orçamento
        </button>
        <button
          onClick={() => setView("usuarios")}
          className={`w-full text-left px-4 py-2 rounded ${
            view === "usuarios"
              ? "bg-[#9E430E]"
              : "hover:bg-[#1a1a1a] text-[#F7F6F3]"
          }`}
        >
          Gerenciamento Usuários
        </button>
      </aside>

{!sidemenuIsOpen && <div  className="absolute sm:hidden top-2 left-2  " >
      <MenuIcon onClick={() => setSidemenuIsOpen(!sidemenuIsOpen)} className="text-secondary cursor-pointer" />
</div>}

      {/* Conteúdo */}
      <main className="flex-1 p-8">
        {view === "orcamento" ? <OrcamentoAdmin /> : <UsuariosAdmin />}
      </main>
    </div>
  );
};
