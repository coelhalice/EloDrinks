import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/presentation/components/ui/input"
import { Button } from "@/presentation/components/ui/button"
import { ListFilter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table"
import { BeverageModal } from "@/presentation/components/internal/beverageModal"
import { useAuth } from "@/contexts/AuthContext"
import { TableActions } from "@/presentation/components/internal/tableActions"

type Beverage = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  created_at: string;
}

export function AdminBeveragesPage() {
  const user = useAuth()
  const [beverages, setBeverages] = useState<Beverage[]>([])
  const [search, setSearch] = useState("")

  const fetchBeverages = async () => {
    const { data } = await axios.get("http://localhost:3333/beverages")
    setBeverages(data.beveragesComplete)
  }

  useEffect(() => {
    fetchBeverages()
  }, [])

  const filtered = beverages.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6 border-b border-[#F7F6F3] pb-4 border-dashed">
        <div className="flex flex-row items-center justify-between pb-2">
          <h1 className="text-4xl text-[#F7F6F3]">Gerenciar bebidas</h1>
          <div className="flex gap-2 items-center bg-[#9E430E] rounded-full px-4 py-2 text-[#F7F6F3]">
            <p>{user.user?.firstName} {user.user?.last_name}</p>
          </div>
        </div>
        <p className="text-[#F7F6F3]">Adicione, edite ou remova bebidas do sistema.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar bebidas..."
          className="flex-1 px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9E430E]"
        />
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 text-sm text-gray-200 hover:bg-[#1a1a1a] transition">
            <ListFilter className="w-4 h-6" />
            Filtros
          </Button>
          <BeverageModal onCreated={fetchBeverages} />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-[#101820]">
          <TableRow>
            <TableHead className="text-[#F7F6F3] w-1/4">Nome</TableHead>
            <TableHead className="text-[#F7F6F3]">Tipo</TableHead>
            <TableHead className="text-[#F7F6F3]">Descrição</TableHead>
            <TableHead className="text-[#F7F6F3]">Preço</TableHead>
            <TableHead className="text-[#F7F6F3] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((bev) => (
            <TableRow key={bev.id} className="border-b border-gray-700">
              <TableCell className="text-[#F7F6F3]">{bev.name}</TableCell>
              <TableCell className="text-[#F7F6F3]">{bev.type}</TableCell>
              <TableCell className="text-[#F7F6F3]">{bev.description}</TableCell>
              <TableCell className="text-[#F7F6F3]">R$ {bev.price.toFixed(2)}</TableCell>
              <TableCell className="text-right ">
                <TableActions type="beverages" id={bev.id} onDeleteSuccess={fetchBeverages}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
