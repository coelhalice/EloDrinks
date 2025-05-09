import { useState } from 'react'

const categorias = [
  'Drinks',
  'Gin tônica e caipirinhas',
  'Bebidas não alcoólicas',
  'Extras',
]

type Item = {
  id: number
  nome: string
  descricao: string
  categoria: string
  preco: number
}

export const OrcamentoAdmin = () => {
  const [itens, setItens] = useState<Item[]>([])
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    preco: '',
  })

  const handleAdd = () => {
    if (!form.nome || !form.categoria || !form.preco) return

    const novoItem: Item = {
      id: Date.now(),
      nome: form.nome,
      descricao: form.descricao,
      categoria: form.categoria,
      preco: parseFloat(form.preco.replace(/[R$.\s]/g, '').replace(',', '.')),
    }

    setItens(prev => [...prev, novoItem])
    setForm({ nome: '', descricao: '', categoria: '', preco: '' })
  }

  const handleDelete = (id: number) => {
    setItens(prev => prev.filter(item => item.id !== id))
  }

  return (
    <section className='overflow-y-scroll min-h-screen w-full bg-[#0A0F17] text-white'>
      <h1 className='mb-6 text-2xl font-bold text-[#F7F6F3]'>
        Gerenciamento de Orçamento
      </h1>

      {/* Formulário */}
      <div className='mb-10 space-y-4 rounded-lg bg-[#101820] p-6 shadow-md'>
        <input
          type='text'
          placeholder='Nome da bebida'
          className='w-full rounded border border-gray-600 bg-[#0A0F17] p-2 text-[#F7F6F3] placeholder:text-gray-400'
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />

        <input
          type='text'
          placeholder='Descrição da bebida'
          className='w-full rounded border border-gray-600 bg-[#0A0F17] p-2 text-[#F7F6F3] placeholder:text-gray-400'
          value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
        />

        <select
          className='w-full rounded border border-gray-600 bg-[#0A0F17] p-2 text-[#F7F6F3]'
          value={form.categoria}
          onChange={e => setForm({ ...form, categoria: e.target.value })}
        >
          <option value=''>Selecione a categoria</option>
          {categorias.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type='text'
          placeholder='Preço'
          className='w-full rounded border border-gray-600 bg-[#0A0F17] p-2 text-[#F7F6F3] placeholder:text-gray-400'
          value={form.preco}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, '')
            const formatted = (Number(raw) / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
            setForm({ ...form, preco: formatted })
          }}
        />

        <button
          onClick={handleAdd}
          className='rounded bg-[#9E430E] px-6 py-2 text-white hover:opacity-90'
        >
          Adicionar item
        </button>
      </div>

      {/* Tabela */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-[#F7F6F3]'>
          <thead className='border-b border-gray-600 text-sm'>
            <tr>
              <th className='px-2 py-2'>Nome</th>
              <th className='px-2'>Descrição</th>
              <th className='px-2'>Categoria</th>
              <th className='px-2'>Preço</th>
              <th className='px-2'>Ações</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {itens.map(item => (
              <tr key={item.id} className='border-b border-gray-700'>
                <td className='px-2 py-2'>{item.nome}</td>
                <td className='px-2'>{item.descricao}</td>
                <td className='px-2'>{item.categoria}</td>
                <td className='px-2'>R${item.preco.toFixed(2)}</td>
                <td className='px-2'>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='text-[#9E430E] hover:underline'
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
