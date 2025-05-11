import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreVertical } from "lucide-react"
import { DeleteModal } from "../deleteModal"
import { useState } from "react"

interface TableActionsProps {
  type: string;
  id: string;
  onDeleteSuccess: () => void;
}

export function TableActions({ type, id, onDeleteSuccess }: TableActionsProps) {
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 hover:bg-muted rounded text-[#F7F6F3]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32 bg-[#101820] border-[1px] border-[#F7F6F3]">
          <DropdownMenuItem className="text-[#F7F6F3]">
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="text-red-600">
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal type={type} id={id} onSucess={onDeleteSuccess} open={openDelete} onOpenChange={setOpenDelete} />
    </>
  )
}
