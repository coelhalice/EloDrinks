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
import { Textarea } from "../../ui/textarea"

const beverageSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum([
  "Destilados",
  "Fermentadas",
  "Shots",
  "Coquetéis",
  "Não alcoolicas"
], {
  required_error: "O tipo da bebida é obrigatório",
}),
  description: z.string().min(15, "Descrição é obrigatória"),
  price: z.number().min(0, "Preço deve ser maior que 0"),
})

type BeverageForm = z.infer<typeof beverageSchema>

type BeverageModalProps = {
  onCreated?: () => void
}
export function BeverageModal({ onCreated }: BeverageModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BeverageForm>({
    resolver: zodResolver(beverageSchema),
    defaultValues: {
      name: '',
      type: undefined,
      description: '',
      price: 0,
    },
  })

  const onSubmit = async (data: BeverageForm) => {
    try {
      await axios.post('http://localhost:3333/beverages', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      reset()
      toast.success("Bebida criada com sucesso!")
      onCreated?.() // <- chama o fetch na tela principal
    } catch (error ) {
      const message = axios.isAxiosError(error) && error.response?.data?.message 
        ? error.response.data.message 
        : 'Ocorreu um erro inesperado.'
      toast.error("Erro ao criar bebida: " + message);
      console.error("Erro ao criar bebida:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#9E430E] text-[#fff] hover:bg-[#ad5522]">
          <PlusIcon className="w-4 h-4" />
          Adicionar Bebida
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#101820] text-[#FFF] max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Bebida</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova Bebida.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="name">Nome da Bebida</Label>
              <Input id="name" placeholder="Nome da Bebida" className="mt-2" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="flex-1">
              <Label htmlFor="type" className="pb-2">Tipo</Label>
              <Select onValueChange={(value) => setValue("type", value as "Destilados" | "Fermentadas" | "Shots" | "Coquetéis" | "Não alcoolicas")}>
                <SelectTrigger className="bg-[#0A0F17] text-[#F7F6F3] border-gray-600">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#101820] text-[#fff]">
                  <SelectItem value="Destilados">Destilados</SelectItem>
                  <SelectItem value="Fermentadas">Fermentadas</SelectItem>
                  <SelectItem value="Shots">Shots</SelectItem>
                  <SelectItem value="Coquetéis">Coquetéis</SelectItem>
                  <SelectItem value="Não alcoolicas">Não alcoólicas</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" rows={4} placeholder="E-mail" className="mt-2" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="">Preço</Label>
            <Input id="number" type="number" placeholder="Preço" className="mt-2" step={0.01} {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <Button type="submit" className="bg-[#9E430E] hover:bg-[#ad5522] text-white mt-2">
            Adicionar Bebida
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
