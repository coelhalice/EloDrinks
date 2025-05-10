import { useAuth } from "@/contexts/AuthContext";
import { UserModal } from "@/presentation/components/internal/userModal";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { ListFilter, MoreVertical } from "lucide-react";

export function AdminUsersPage() {
  const user = useAuth()

  console.log(user)

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6 border-b-[1px] border-[#F7F6F3] pb-4 border-dashed">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-4xl text-[#F7F6F3]">Gerenciar usuários</h1>
          <div className="flex flex-row items-center gap-2 bg-[#9E430E] rounded-full px-4 py-2 text-[#F7F6F3]">
            <p>{user.user?.firstName} {user.user?.last_name}</p>
          </div>
        </div>
        <p className="text-[#F7F6F3]">
          Aqui você pode gerenciar os usuários do sistema, adicionar novos
          usuários, editar ou remover usuários existentes.
        </p>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Pesquisar usuários..."
            className="flex-1 px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9E430E]"
          />
          <div className="flex gap-2">
            <Button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-[#1a1a1a] transition">
              <ListFilter className="w-4 h-6" />
              Filtros
            </Button>

            <UserModal />
            
            {/* <button className="flex items-center gap-2 bg-[#9E430E] text-[#fff] px-4 py-2 rounded-md text-sm hover:bg-[#ad5522] transition">
              <PlusIcon className="w-4 h-4" />
              Adicionar Usuário
            </button> */}
          </div>
        </div>

        <div>
          <Table>
            <TableHeader className="bg-[#101820]">
              <TableRow>
                <TableHead className="w-2/5 text-[#F7F6F3]">Nome</TableHead>
                <TableHead className="text-[#F7F6F3]">E-mail</TableHead>
                <TableHead className="text-[#F7F6F3]">Cargo</TableHead>
                <TableHead className="text-right text-[#F7F6F3]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-gray-700">
                <TableCell className="text-[#F7F6F3]">Yves Antônio</TableCell>
                <TableCell className="text-[#F7F6F3]">yvesan12@gmail.com</TableCell>
                <TableCell className="text-[#F7F6F3]">Administrador</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-[#F7F6F3] hover:text-[#ccc]">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}