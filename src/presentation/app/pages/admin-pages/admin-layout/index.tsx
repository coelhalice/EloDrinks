import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen bg-[#0A0F17]">
      {/* Sidebar fixa */}
      <div className="w-[240px] bg-[#101820] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center border-b border-[#fff] pb-2">
            <img
              src="/plogo.svg"
              alt="Logo Elo Drinks"
              className="h-16 mx-auto mb-6"
            />
          </div>

          <div className="space-y-2 mt-4">
            <button  className={`w-full text-left px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] ${
                location.pathname === '/admin' ? 'text-orange-500' : 'text-[#F7F6F3]'
              }`}>
              Usuários
            </button>
            <button className="w-full text-left px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] text-[#F7F6F3]">
              Bebidas
            </button>
            <button className="w-full text-left px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] text-[#F7F6F3]">
              Orçamentos
            </button>
          </div>
        </div>

        <div className="border-t border-[#fff] pt-4">
          <button className="w-full text-center px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] text-[#F7F6F3]">
            Logout
          </button>
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto p-8 h-screen">
        {children}
      </div>
    </div>
  );
}
