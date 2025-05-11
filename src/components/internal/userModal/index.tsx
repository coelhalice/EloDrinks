import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { PlusIcon } from "lucide-react"
import { toast } from "react-toastify"

const userSchema = z.object({
  first_name: z.string().min(1, "Nome é obrigatório"),
  last_name: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Selecione um cargo" }),
  }),
})

type UserForm = z.infer<typeof userSchema>

type UserModalProps = {
  onCreated?: () => void
}

export function UserModal({ onCreated }: UserModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: undefined,
    },
  })

  const onSubmit = async (data: UserForm) => {
    try {
      await axios.post('http://localhost:3333/users', data)
      reset()
      toast.success("Usuário criado com sucesso!")
      onCreated?.() // <- chama o fetch na tela principal
    } catch (error ) {
      const message = axios.isAxiosError(error) && error.response?.data?.message 
        ? error.response.data.message 
        : 'Ocorreu um erro inesperado.'
      toast.error("Erro ao criar usuário: " + message);
      console.error("Erro ao criar usuário:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#9E430E] text-[#fff] hover:bg-[#ad5522]">
          <PlusIcon className="w-4 h-4" />
          Adicionar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#101820] text-[#FFF] max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome" className="mt-2" {...register("first_name")} />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>

            <div className="flex-1">
              <Label htmlFor="surname">Sobrenome</Label>
              <Input id="surname" placeholder="Sobrenome" className="mt-2" {...register("last_name")} />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="E-mail" className="mt-2" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="Senha" className="mt-2" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <Label className="mb-2">Cargo</Label>
            <Select onValueChange={(value) => setValue("role", value as "admin" | "user")}>
              <SelectTrigger className="bg-[#0A0F17] text-[#F7F6F3] border-gray-600">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent className="bg-[#101820] text-[#fff]">
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <Button type="submit" className="bg-[#9E430E] hover:bg-[#ad5522] text-white mt-2">
            Adicionar Usuário
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
