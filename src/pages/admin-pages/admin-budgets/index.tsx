import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context"
import { TableActions } from "@/components/internal/tableActions"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

type Beverage = {
  id: string
  name: string
  type: string
  description: string
  price: number
  created_at: string
}

type Budget = {
  id: string
  guests: number
  counters: number
  staff: number
  budget: number
  email: string
  created_at: string
  beverages: Beverage[]
}

export function AdminBudgetsPage() {
  const user = useAuth()
  const [search, setSearch] = useState("")

  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:3333/budgets",
    fetcher,
    {
      dedupingInterval: 30_000,
      revalidateOnFocus: false
    }
  )

  const budgets: Budget[] = data?.budgets ?? []

  const filteredBudgets = budgets.filter((budget) =>
    budget.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6 border-b border-[#F7F6F3] pb-4 border-dashed">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-4xl text-[#F7F6F3]">Gerenciar orçamentos</h1>
          <div className="flex gap-2 items-center bg-[#9E430E] rounded-full px-4 py-2 text-[#F7F6F3]">
            <p>{user.user?.first_name} {user.user?.last_name}</p>
          </div>
        </div>
        <p className="text-[#F7F6F3]">
          Veja os orçamentos realizados até o momento, remova os orçamentos que já foram resolvidos.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar orçamentos..."
          className="flex-1 px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9E430E]"
        />
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-[#1a1a1a] transition">
            <ListFilter className="w-4 h-6" />
            Filtros
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-[#F7F6F3]">Carregando orçamentos...</p>
      ) : error ? (
        <p className="text-red-500">Erro ao carregar orçamentos</p>
      ) : (
        <Table>
          <TableHeader className="bg-[#101820]">
            <TableRow>
              <TableHead className="text-[#F7F6F3]">Email</TableHead>
              <TableHead className="text-[#F7F6F3]">Convidados</TableHead>
              <TableHead className="text-[#F7F6F3]">Balcões</TableHead>
              <TableHead className="text-[#F7F6F3]">Staff</TableHead>
              <TableHead className="text-[#F7F6F3]">Total (R$)</TableHead>
              <TableHead className="text-[#F7F6F3]">Bebidas</TableHead>
              <TableHead className="text-right text-[#F7F6F3]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBudgets.map((budget) => (
              <TableRow key={budget.id} className="border-b border-gray-700">
                <TableCell className="text-[#F7F6F3]">{budget.email}</TableCell>
                <TableCell className="text-[#F7F6F3]">{budget.guests}</TableCell>
                <TableCell className="text-[#F7F6F3]">{budget.counters}</TableCell>
                <TableCell className="text-[#F7F6F3]">{budget.staff}</TableCell>
                <TableCell className="text-[#F7F6F3]">R$ {budget.budget.toFixed(2)}</TableCell>
                <TableCell className="text-[#F7F6F3]">
                  <ul className="list-disc ml-4">
                    {budget.beverages.map((bev) => (
                      <li key={bev.id}>
                        <span className="font-medium">{bev.name}</span> ({bev.type}) – R$ {bev.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="text-right">
                  <TableActions type="budgets" id={budget.id} onDeleteSuccess={() => mutate()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
