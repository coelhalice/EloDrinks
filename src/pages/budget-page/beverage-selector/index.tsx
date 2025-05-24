import useSWR from "swr";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type Beverage = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
};

// Função fetcher genérica
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BeverageSelector() {
  const { data, isLoading, error } = useSWR(
    "http://localhost:3333/beverages",
    fetcher,
    {
      dedupingInterval: 30_000,
      revalidateOnFocus: false,
    }
  );

  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleSelection = (id: string) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) return <p className="text-[#FFF] text-center">Carregando...</p>;
  if (error) return <p className="text-red-500 text-center">Erro ao carregar bebidas</p>;

  const beverages: Beverage[] = data?.beveragesComplete || [];

  const grouped = beverages.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Beverage[]>);

  const total = Object.entries(selected)
    .filter(([, checked]) => checked)
    .reduce((sum, [id]) => {
      const drink = beverages.find((d) => d.id === id);
      return drink ? sum + drink.price : sum;
    }, 0);

  return (
    <div className="w-full px-20 mx-auto text-[#FFF] space-y-6">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type}>
          <h2 className="text-lg font-semibold mb-4">{type}</h2>
          <div className="space-y-4">
            {items.map((drink) => (
              <div
                key={drink.id}
                className="flex items-start justify-between border-b border-gray-600 pb-1"
              >
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={selected[drink.id] || false}
                    onCheckedChange={() => toggleSelection(drink.id)}
                  />
                  <div className="relative -top-1.5">
                    <p className="font-medium">{drink.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {drink.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  R$ {drink.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Separator className="my-4" />
      <div className="flex justify-between text-lg font-bold bg-[#FFF] text-[#101820] p-4 rounded-md">
        <span>Total:</span>
        <span>R$ {total.toFixed(2).replace(".", ",")}</span>
      </div>
    </div>
  );
}
