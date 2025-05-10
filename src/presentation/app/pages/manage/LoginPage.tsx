import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      await login(email, senha);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <section className="min-h-screen bg-[#0A0F17] flex items-center justify-center px-4 w-screen">
      <div className="bg-[#101820] border border-gray-500 rounded-xl p-8 w-full max-w-md shadow-md">
        <h1 className="text-center text-2xl text-[#F7F6F3] mb-8">Login</h1>

        <div className="mb-4">
          <label className="block text-sm text-[#F7F6F3] mb-1">Seu e-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail..."
            className="w-full px-4 py-2 rounded bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-500 border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#F7F6F3] mb-1">Sua senha</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            className="w-full px-4 py-2 rounded bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-500 border border-gray-600"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#9E430E] hover:bg-[#ad5522] text-white py-2 rounded transition"
        >
          Logar
        </button>
      </div>
    </section>
  );
};
