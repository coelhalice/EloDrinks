import { Button } from "@/components/ui/button";
import { BeverageSelector } from "./beverage-selector";
import { BudgetDetails } from "./budget-details";
import { ArrowRight } from "lucide-react";
import { useBudget } from "@/contexts/budget-context";
import { Header } from "@/components/internal/header";

export default function BudgetPage() {

  const { handleBudgetFinish } = useBudget();



  return (
    <div className="bg-[#101820] min-h-screen py-5 px-4 flex flex-col gap-10">
      <Header />
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-[#fff] text-center mb-8">
          Monte seu orçamento
        </h1>
        <p className="text-lg text-[#fff] text-center mb-8">
          Escolha as bebidas e serviços que deseja incluir no seu evento.
        </p>
      </div>
      <BudgetDetails />
      <BeverageSelector />
      <div className="flex flex-row justify-end mx-20">
        <Button onClick={() => handleBudgetFinish()} className="flex gap-2 bg-[#9E430E] text-[#fff] hover:bg-[#7A2D0B] w-[250px] rounded-full text-lg font-bold items-center justify-center">
          <span className="text-[#fff]">Fechar Orçamento</span>
          <ArrowRight className="w-6 h-6 mt-1" />
        </Button>
      </div>
    </div>
  );
}
