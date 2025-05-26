import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type Beverage = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
};

type BudgetData = {
  id: string;
  beverages: Record<string, Beverage>; // só os selecionados
  guests: number;
  counters: number;
  staff: number;
  budget: number;
};

type BudgetContextType = {
  data: BudgetData;
  updateBeverage: (bev: Beverage, checked: boolean) => void;
  updateGuests: (value: number) => void;
  updateCounters: (value: number) => void;
  updateStaff: (value: number) => void;
  budget: number;
  handleBudgetFinish: () => void;
  resetBudget: () => void;
};

const BudgetContext = createContext({} as BudgetContextType);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<BudgetData>({
    id: uuidv4(),
    beverages: {},
    guests: 0,
    counters: 0,
    staff: 0,
    budget: 0,
  });

  const updateBeverage = (bev: Beverage, checked: boolean) => {
    setData((prev) => {
      const newBeverages = { ...prev.beverages };
      if (checked) {
        newBeverages[bev.id] = bev;
      } else {
        delete newBeverages[bev.id];
      }

      return {
        ...prev,
        beverages: newBeverages,
      };
    });
  };

  const updateGuests = (value: number) => setData((prev) => ({ ...prev, guests: value }));
  const updateCounters = (value: number) => setData((prev) => ({ ...prev, counters: value }));
  const updateStaff = (value: number) => setData((prev) => ({ ...prev, staff: value }));

  const totalBeverages = Object.entries(data.beverages)
    .filter(([, checked]) => checked)
    .reduce((sum, [id]) => {
      const drink = data.beverages[id];
      return drink ? sum + drink.price : sum;
    }, 0);

  
  const budget = totalBeverages * data.guests  + data.counters * 300 + data.staff * 100;

  const navigate = useNavigate();
  const handleBudgetFinish = 
    () => {
      const budgetData = {
        ...data,
        budget,
      };
      setData(budgetData);
      console.log("Budget data:", budgetData);
      navigate(`/orcamento/${budgetData.id}`)
    };


    const resetBudget = () => {
    setData({
      id: uuidv4(),
      beverages: {},
      guests: 0,
      counters: 0,
      staff: 0,
      budget: 0,
    });
  };


  
  return (
    <BudgetContext.Provider
      value={{
        data,
        updateBeverage,
        updateGuests,
        updateCounters,
        updateStaff,
        budget,
        handleBudgetFinish,
        resetBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error("useBudget deve ser usado dentro de BudgetProvider");
  return context;
};
