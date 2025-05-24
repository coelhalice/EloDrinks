import { useBudget } from "@/contexts/budget-context";
import { useState } from "react";

export default function CheckoutPage() {
  const { data, budget } = useBudget();
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/send-budget", {
      method: "POST",
      body: JSON.stringify({ ...data, email }),
      headers: { "Content-Type": "application/json" },
    });

    alert("Orçamento enviado com sucesso!");
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Resumo do Orçamento</h1>
      <ul className="mb-4">
        {Object.values(data.beverages).map((b) => (
          <li key={b.id}>{b.name} - R$ {b.price.toFixed(2).replace(".", ",")}</li>
        ))}
      </ul>
      <p className="mb-2">Convidados: {data.guests}</p>
      <p className="mb-2">Funcionários: {data.staff}</p>
      <p className="mb-4">Balcões: {data.counters}</p>
      <p className="text-xl font-bold mb-4">Total: R$ {budget.toFixed(2).replace(".", ",")}</p>

      <input
        type="email"
        className="bg-gray-800 p-2 rounded text-white w-full mb-4"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit} className="bg-orange-600 px-6 py-2 rounded font-bold">
        Enviar orçamento
      </button>
    </div>
  );
}
