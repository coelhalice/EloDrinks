import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout.");
    }
  }

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
            <Button 
              variant="ghost" 
              className={`w-full justify-start px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] ${
                location.pathname === '/admin' ? 'text-orange-500' : 'text-[#F7F6F3]'
              }`}
              onClick={() => navigate("/admin")}
            >
              Usuários
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] ${
                location.pathname === '/admin/beverages' ? 'text-orange-500' : 'text-[#F7F6F3]'
              }`}
              onClick={() => navigate("/admin/beverages")}
            >
              Bebidas
            </Button>
            <Button 
              variant="ghost"
              className="w-full justify-start px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] text-[#F7F6F3]">
              Orçamentos
            </Button>
          </div>
        </div>

        <div className="border-t border-[#fff] pt-4">
          <Button 
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-center px-4 py-2 rounded text-lg hover:bg-[#1a1a1a] text-[#F7F6F3]">
            Logout
          </Button>
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto p-8 h-screen">
        {children}
      </div>
    </div>
  );
}
