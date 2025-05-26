import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog"

import axios from "axios"
import { toast } from "react-toastify"

interface DeleteModalProps {
  type: string
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSucess?: () => void
}

export function DeleteModal({ type, id, open, onOpenChange, onSucess }: DeleteModalProps) {
  let typeString = ""

  if (type === "users") {
    typeString = "Usuário"
  } else if (type === "beverages") {
    typeString = "Bebida"
  } else if (type === "budgets") {
    typeString = "Orçamento"
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3333/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      toast.success(`${typeString} deletad${type === "users" || type === "budgets" ? "o" : "a"} com sucesso!`)
      onOpenChange(false)
      onSucess?.()
    } catch (error) {
      const message = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Ocorreu um erro inesperado.'
      toast.error(message)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#101820] text-[#FFF]">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que quer DELETAR {type === "users" || type === "budget" ? "esse" : "essa"} {typeString}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso irá deletar {type === "users" || type === "budget" ? "esse" : "essa"} {typeString} e remover seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#101820] hover:bg-[#303d4b]">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-800">Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
