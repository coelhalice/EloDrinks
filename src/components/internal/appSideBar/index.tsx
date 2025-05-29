import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context";
import { Beer, DollarSign, LogOut, Users } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const items = [
  {
    title: "Usuários",
    icon: Users,
    url: "/admin",
  },
  {
    title: "Bebidas",
    icon: Beer,
    url: "/admin/beverages",
  },
  {
    title: "Orçamentos",
    icon: DollarSign,
    url: "/admin/budgets",
  },
]



export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth()

  const { state } = useSidebar()

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout.");
    }
  }

  return (
    <Sidebar className="bg-[#101820]" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center border-b border-[#fff] pb-2" onClick={() => navigate("/")}>
          {state === "expanded" && (
            <img
              src="/plogo.svg"
              alt="Logo Elo Drinks"
              className="h-16 mx-auto mb-6"
            />
          )}
          {state === "collapsed" && (
            <img
              src="/logo.svg"
              alt="Logo Elo Drinks"
              className="h-16 mx-auto mb-6"
            />
            )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`text-[#F7F6F3] hover:bg-[#1a1a1a] ${location.pathname === item.url ? 'bg-[#9E430E]' : ''}`}>
                  <SidebarMenuButton asChild>
                    <a onClick={() => navigate(item.url)} className="flex items-center gap-2">
                      <item.icon className="h-6 w-6" />
                      <span className="text-xl">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center p-2">
          <a
            onClick={() => handleLogout()}
            className="text-[#F7F6F3] hover:text-orange-500 text-lg flex gap-2 items-center justify-center"
          >
            {state === "expanded" && <span>SAIR</span>}
            <LogOut className="h-6 w-6 inline-block" />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
