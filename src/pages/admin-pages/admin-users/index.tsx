import { useAuth } from "@/contexts/auth-context";
import { UserModal } from "@/components/internal/userModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { TableActions } from "@/components/internal/tableActions";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
}

export function AdminUsersPage() {
  const user = useAuth()
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user.token, navigate]);

  // Só faz fetch a cada 30 segundos, não toda vez que a página é carregada
  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:3333/users", 
    fetcher,
    {
      dedupingInterval: 30_000,
      revalidateOnFocus: false
    }
  )

  const users = data?.usersComplete ?? []

  const filtered: User[] = users.filter((b: User) =>
    b.first_name.toLowerCase().includes(search.toLowerCase()) ||
    b.last_name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6 border-b-[1px] border-[#F7F6F3] pb-4 border-dashed">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-4xl text-[#F7F6F3]">Gerenciar usuários</h1>
          <div className="flex flex-row items-center gap-2 bg-[#9E430E] rounded-full px-4 py-2 text-[#F7F6F3]">
            <p>{user.user?.first_name} {user.user?.last_name}</p>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar usuários..."
            className="flex-1 px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9E430E]"
          />
          <div className="flex gap-2">
            <Button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-[#1a1a1a] transition">
              <ListFilter className="w-4 h-6" />
              Filtros
            </Button>
            <UserModal onCreated={() => mutate()}/>
          </div>
        </div>

        {isLoading ? (
            <p className="text-[#F7F6F3]">Carregando usuários...</p>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar usuários</p>
          ) : (
          <Table>
            <TableHeader className="bg-[#101820]">
              <TableRow>
                <TableHead className="w-2/5 text-[#F7F6F3]">Nome</TableHead>
                <TableHead className="text-[#F7F6F3]">E-mail</TableHead>
                <TableHead className="text-[#F7F6F3]">Cargo</TableHead>
                <TableHead className="text-[#F7F6F3]">Criado em</TableHead>
                <TableHead className="text-right text-[#F7F6F3]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(user => (
                <TableRow key={user.id} className="border-b border-gray-700">
                  <TableCell className="text-[#F7F6F3]">{user.first_name} {user.last_name}</TableCell>
                  <TableCell className="text-[#F7F6F3]">{user.email}</TableCell>
                  <TableCell className="text-[#F7F6F3]">{user.role}</TableCell>
                  <TableCell className="text-[#F7F6F3]">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-[#F7F6F3] hover:text-[#ccc]">
                      <TableActions type="users" id={user.id} onDeleteSuccess={() => mutate()}/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}