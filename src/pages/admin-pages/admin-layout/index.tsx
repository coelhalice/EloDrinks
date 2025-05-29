import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/internal/appSideBar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider className="bg-[#0A0F17]" defaultOpen={true}>
      <AppSidebar />
      <div className="flex-1 overflow-y-auto p-8 h-screen">
        <SidebarTrigger className="text-[#fff]" />
        {children}
      </div>
    </SidebarProvider>

  );
}
