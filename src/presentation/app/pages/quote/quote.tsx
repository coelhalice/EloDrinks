import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/internal/select/select'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const drinks = [
  { name: 'Mojito', price: 50 },
  { name: 'Caipiroska', price: 90 },
  { name: 'Negroni', price: 100.5 },
]

const ginAndCaipirinhas = [
  { name: 'Gin Tônica Clássico', price: 50 },
  { name: 'Caipirinha Limão', price: 90 },
  { name: 'Gin Tropical', price: 100.5 },
]

const nonAlcoholic = [
  { name: 'Refrigerante', price: 50 },
  { name: 'Suco Natural', price: 90 },
  { name: 'Água com Gás', price: 100.5 },
]

const extras = [
  { name: 'Welcome Drinks', price: 50 },
  { name: 'Shots', price: 90 },
]

export const Quote = () => {
  const [guests, setGuests] = useState(0)
  const [counter, setCounterType] = useState(0)
  const [staff, setStaff] = useState(0)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const navigate = useNavigate()

  const handleItemChange = (name: string) => {
    setSelectedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name],
    )
  }


  const total = () => {
    const allItems = [...drinks, ...ginAndCaipirinhas, ...nonAlcoholic, ...extras]
    const itemsTotal = selectedItems.reduce((sum, name) => {
      const item = allItems.find(i => i.name === name)
      return sum + (item?.price || 0)
    }, 0)
    return (itemsTotal + guests * 10 + counter + staff * 20).toFixed(2)
  }

  return (
    <div className='min-h-screen w-screen overflow-y-scroll bg-primary p-8 text-secondary'>
      <header className='mx-auto mb-20 flex max-w-[972px] items-center justify-between'>
        <span className='cursor-pointer text-sm hover:underline'>INÍCIO</span>
        <span className='cursor-pointer text-sm hover:underline'>SERVIÇO</span>
        <img src='/logo.svg' alt='Logo' className='h-16' />
        <span className='cursor-pointer text-sm hover:underline'>
          ORÇAMENTO
        </span>
        <span className='cursor-pointer text-sm hover:underline'>CONTATO</span>
      </header>
      <div className='mx-auto w-full max-w-[1200px]'>
        <h1 className='mb-4 text-center text-3xl font-bold'>ORÇAMENTO</h1>
        <p className='mx-auto mb-20 max-w-xl text-center text-secondary'>
          Selecione os itens desejados para montar o serviço ideal para seu
          evento. Escolha o tipo de balcão, número de convidados, funcionários e
          as opções de bebidas.
        </p>

        <div className='mb-8 flex flex-col gap-4 md:flex-row'>
          <div className='flex w-full flex-col items-center gap-4'>
            <h4 className='text-2xl'>Número de convidados</h4>
            <input
              type='number'
              placeholder='---'
              className='h-10 w-[300px] border border-secondary pl-2 text-secondary placeholder:text-secondary'
              onChange={e => setGuests(Number(e.target.value))}
            />
          </div>
          <div className='flex w-full flex-col items-center gap-4'>
            <h4 className='text-2xl'>Balcão</h4>
            <Select onValueChange={(value) =>{
              setCounterType(parseInt(value))
            }} >
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder='---' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'>Sem balcão</SelectItem>
                <SelectItem value='500'>Iluminado</SelectItem>
                <SelectItem value='300'>Padrão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full flex-col items-center gap-4'>
            <h4 className='text-2xl'>Funcionários</h4>
            <Select onValueChange={(value) =>{
              setStaff(parseInt(value))
            }} >
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder='---' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-8' >
          <div className='flex w-full flex-col gap-5'>
            <h2 className='text-2xl font-semibold'>Drinks</h2>
            <div className='flex flex-col gap-2'>
              {drinks.map(item => (
                <div className='flex items-center gap-2' >
                  <label key={item.name} className='flex items-center w-fit text-xl'>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(item.name)}
                      onChange={() => handleItemChange(item.name)}
                      className='mr-2'
                    />
                    {item.name}
                  </label>
                  <hr className='mt-[6px] flex-grow border border-secondary' />
                  <p className='m-0 text-xl' >R${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className='mb-2 text-2xl font-semibold'>
              Gin tônica e caipirinhas
            </h2>
            {ginAndCaipirinhas.map(item => (
              <div className='flex items-center gap-2' >
              <label key={item.name} className='flex items-center w-fit text-xl'>
                <input
                  type='checkbox'
                  checked={selectedItems.includes(item.name)}
                  onChange={() => handleItemChange(item.name)}
                  className='mr-2'
                />
                {item.name}
              </label>
              <hr className='mt-[6px] flex-grow border border-secondary' />
              <p className='m-0 text-xl' >R${item.price.toFixed(2)}</p>
            </div>
            ))}
          </div>

          <div>
            <h2 className='mb-2 text-2xl font-semibold'>
              Bebidas não alcoólicas
            </h2>
            {nonAlcoholic.map(item => (
              <div className='flex items-center gap-2' >
              <label key={item.name} className='flex items-center w-fit text-xl'>
                <input
                  type='checkbox'
                  checked={selectedItems.includes(item.name)}
                  onChange={() => handleItemChange(item.name)}
                  className='mr-2'
                />
                {item.name}
              </label>
              <hr className='mt-[6px] flex-grow border border-secondary' />
              <p className='m-0 text-xl' >R${item.price.toFixed(2)}</p>
            </div>
            ))}
          </div>

          <div>
            <h2 className='mb-2 text-2xl font-semibold'>Extras</h2>
            {extras.map(extra => (
              <div className='flex items-center gap-2' >
              <label key={extra.name} className='flex items-center w-fit text-xl'>
                <input
                  type='checkbox'
                  checked={selectedItems.includes(extra.name)}
                  onChange={() => handleItemChange(extra.name)}
                  className='mr-2'
                />
                {extra.name}
              </label>
              <hr className='mt-[6px] flex-grow border border-secondary' />
              <p className='m-0 text-xl' >R${extra.price.toFixed(2)}</p>
            </div>
            ))}
          </div>
        </div>

        <div className='mt-8 text-xl flex w-full justify-between bg-secondary p-2'>
          <p className='text-primary' >Total:</p>
          <p className='text-primary font-semibold' >R${total()}</p>
        </div>

        <div className='w-full flex justify-end mt-10' >
        <button
          className='mt-4 rounded-full bg-[#9E430E] px-9 py-2 text-secondary transition-opacity duration-300 hover:opacity-90 self-end'
          onClick={() => navigate('/checkout')}
          >
          Fechar serviço! ➞
        </button>
          </div>
      </div>
    </div>
  )
}
