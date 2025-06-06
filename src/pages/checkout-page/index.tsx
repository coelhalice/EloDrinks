import { Header } from "@/components/internal/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBudget } from "@/contexts/budget-context";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import z from "zod";
import { Footer } from "../landing-page/footer";

const emailSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function CheckoutPage() {
  const { data, budget, resetBudget } = useBudget();

  const {
      register,
      handleSubmit,
      reset,
      watch,
    } = useForm<EmailForm>({
      resolver: zodResolver(emailSchema),
      defaultValues: {
        email: '',
      },
    })

  const onSubmit = async (submit: EmailForm) => {

    const validation = emailSchema.safeParse(submit);
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Email inválido");
      return;
    }
  
    const beverageIds = Object.values(data.beverages).map((b) => b.id);
  
    const payload = {
      id: data.id,
      guests: data.guests,
      counters: data.counters,
      staff: data.staff,
      budget: data.budget,
      beverageIds: beverageIds,
      email: submit.email,
    }
  
    try {
      await axios.post('http://localhost:3333/budgets', payload)
      reset()
      toast.success("Orçamento enviado com sucesso!")
      setTimeout(() => {
        resetBudget()
      }, 1000)
    } catch (error ) {
      const message = axios.isAxiosError(error) && error.response?.data?.message 
        ? error.response.data.message 
        : 'Ocorreu um erro inesperado.'
      toast.error("Erro ao criar orçamento: " + message);
      console.error("Erro ao criar orçamento:", error)
    }
  }

  return (
    <div className="bg-[#101820] min-h-screen pt-5 flex flex-col">
      <Header />
      <div className="p-10 text-[#fff]">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#fff] text-center mb-8">
            Resumo do Orçamento
          </h1>
        </div>

        <div className="flex flex-row w-full gap-4 min-h-[300px] pb-6">
          <div className="bg-[#0A0F17] h-fit p-4 rounded-lg mb-4 border-1 border-gray-600 w-2/3">
              {Object.values(data.beverages).map((b) => (
                <div key={b.id} className="flex flex-row justify-between items-start mb-4 border-b border-gray-600 pb-1 last:border-b-0 last:mb-0">
                  <div className="flex flex-col">
                    <span>{b.name}</span>
                    <span>{b.description}</span>
                  </div>
                  <span>
                    <span>R$ {b.price.toFixed(2).replace(".", ",")}</span>
                  </span>
                </div>
              ))}
          </div>
          <div className="flex flex-col w-1/3">
            <div className="bg-[#0A0F17] p-4 rounded-lg h-fit border-1 border-gray-600  flex flex-col gap-2 text-base">
              <p>Convidados: {data.guests}</p>
              <p>Funcionários: {data.staff}</p>
              <p>Balcões: {data.counters}</p>
            </div>
            <div className="bg-[#0A0F17] h-fit p-4 rounded-lg border-1 border-gray-600 flex flex-col items-center justify-center text-base mt-4">
              <p className="text-xl font-bold">Total: R$ {budget.toFixed(2).replace(".", ",")}</p>
            </div>
          </div>
        </div>
        
        <form role="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 mt-5 items-center">
          <Input
            type="email"
            {...register("email")}
            placeholder="Digite seu email"
            className="flex-1 py-6 px-6"
          />
          <Button
          type="submit"
          disabled={!watch("email")}
          className="bg-[#9E430E] hover:bg-[#cc7441] text-base px-6 py-6 rounded-[8px] font-bold transition-all duration-75"
          >
            Enviar orçamento
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
