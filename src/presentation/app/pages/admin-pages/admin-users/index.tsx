import { useAuth } from "@/contexts/AuthContext";
import { UserModal } from "@/presentation/components/internal/userModal";
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
          <input
            type="text"
            placeholder="Pesquisar usuários..."
            className="flex-1 px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9E430E]"
          />
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-[#1a1a1a] transition">
              <ListFilter className="w-4 h-6" />
              Filtros
            </button>

            <UserModal />
            
            {/* <button className="flex items-center gap-2 bg-[#9E430E] text-[#fff] px-4 py-2 rounded-md text-sm hover:bg-[#ad5522] transition">
              <PlusIcon className="w-4 h-4" />
              Adicionar Usuário
            </button> */}
          </div>
        </div>

        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#101820] text-[#F7F6F3]">
                <th className="text-left w-2/5 px-4 py-2">Nome</th>
                <th className="text-left  px-4 py-2">E-mail</th>
                <th className="text-left  px-4 py-2">Cargo</th>
                <th className="text-right  px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 ">
                <td className="px-4 py-3 text-[#F7F6F3]">Yves Antônio</td>
                <td className="px-4 py-3 text-[#F7F6F3]">yvesan12@gmail.com</td>
                <td className="px-4 py-3 text-[#F7F6F3]">Administrador</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-[#F7F6F3] hover:text-[#ccc] transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}