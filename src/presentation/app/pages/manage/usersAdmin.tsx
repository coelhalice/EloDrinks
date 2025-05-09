import { useState } from "react";

type Usuario = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState<Usuario>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleAdd = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.role) return;
    const novoUsuario = {
      ...form,
      id: Date.now(),
    };
    setUsuarios((prev) => [...prev, novoUsuario]);
    setForm({ id: 0, firstName: "", lastName: "", email: "", password: "", role: "" });
  };

  const handleDelete = (id: number) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <section className="text-[#F7F6F3] overflow-y-scroll w-full">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Usuários</h1>

      {/* Formulário */}
      <div className="bg-[#101820] p-6 rounded-lg mb-10 shadow-md space-y-4 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Primeiro nome"
            className="p-2 rounded bg-[#0A0F17] text-white border border-gray-600 w-full"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Último nome"
            className="p-2 rounded bg-[#0A0F17] text-white border border-gray-600 w-full"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-[#0A0F17] text-white border border-gray-600"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 rounded bg-[#0A0F17] text-white border border-gray-600"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full p-2 rounded bg-[#0A0F17] text-white border border-gray-600"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Selecione a função</option>
          <option value="admin">Admin</option>
          <option value="atendente">Atendente</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-[#9E430E] px-6 py-2 rounded text-white hover:opacity-90"
        >
          Adicionar usuário
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="py-2 px-2">Nome</th>
              <th className="px-2">Email</th>
              <th className="px-2">Função</th>
              <th className="px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b border-gray-700">
                <td className="py-2 px-2">{u.firstName} {u.lastName}</td>
                <td className="px-2">{u.email}</td>
                <td className="px-2 capitalize">{u.role}</td>
                <td className="px-2">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-400 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
