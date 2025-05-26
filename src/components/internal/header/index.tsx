import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <header className="flex flex-row text-[#fff] items-center justify-around mb-8 px-10 text-xl w-full">
      <span className="cursor-pointer hover:underline w-[100px]" onClick={() => handleNavigate('/')}>INÍCIO</span>
      <span className="cursor-pointer hover:underline w-[100px]">SERVIÇO</span>
      <img src="/logo.svg" alt="Logo" className="h-16 w-[100px]" onClick={() => handleNavigate('/')}/>
      <span className="cursor-pointer hover:underline w-[100px]" onClick={() => handleNavigate('/orcamento')}>ORÇAMENTO</span>
      <span className="cursor-pointer hover:underline w-[100px]">CONTATO</span>
    </header>
  )
}