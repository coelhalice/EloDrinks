import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const isValidEmail = (email: string) => {
    const trimmedEmail = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    const trimmedSenha = senha.trim();
    
    // Validação para campos vazios
    if (!trimmedEmail || !trimmedSenha) {
      setError("Preencha todos os campos");
      return;
    }

    // Validação para email inválido
    if (!isValidEmail(trimmedEmail)) {
      setError("Email inválido");
      return;
    }

    try {
      await login(trimmedEmail, trimmedSenha);
      setError(""); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao fazer login";
      setError(errorMessage);
    }
  };

  const isFormValid = email.trim() !== "" && senha.trim() !== "" && isValidEmail(email);

  return (
    <section className="min-h-screen bg-[#0A0F17] flex items-center justify-center px-4 w-screen">
      <div className="bg-[#101820] border border-gray-500 rounded-xl p-8 w-full max-w-md shadow-md">
        <h1 className="text-center text-2xl text-[#F7F6F3] mb-8">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4" role="form">
          {/* Mensagem de erro sempre aparece quando há erro */}
          {error && (
            <div className="text-red-500 text-sm mb-4" data-testid="error-message">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-[#F7F6F3] mb-1">
              Seu e-mail
            </label>
            <input
              id="email"
              data-testid="email"
              type="email"
              required
              placeholder="Digite seu e-mail..."
              className="w-full px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-500 border border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="senha" className="block text-sm text-[#F7F6F3] mb-1">
              Sua senha
            </label>
            <Input
              id="senha"
              data-testid="senha"
              type="password"
              required
              placeholder="Digite sua senha..."
              className="w-full px-4 py-2 rounded-md bg-[#0A0F17] text-[#F7F6F3] placeholder:text-gray-500 border border-gray-600"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-[#9E430E] hover:bg-[#ad5522] text-white py-2 rounded-md transition disabled:opacity-50"
          >
            Logar
          </Button>
        </form>
      </div>
    </section>
  );
}