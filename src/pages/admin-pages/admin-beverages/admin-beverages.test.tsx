import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest'

import { useAuth } from '@/contexts/auth-context'
import { useNavigate } from 'react-router-dom'

vi.mock('@/contexts/auth-context', () => ({
  useAuth: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

vi.mock('@/components/internal/beverageModal', () => ({
  BeverageModal: ({ onCreated }: { onCreated: () => void }) => (
    <button onClick={onCreated} data-testid="beverage-modal">
      Adicionar Bebida
    </button>
  ),
}))

vi.mock('@/components/internal/tableActions', () => ({
  TableActions: ({ id, onDeleteSuccess }: { type: string; id: string; onDeleteSuccess: () => void }) => (
    <button onClick={onDeleteSuccess} data-testid={`table-actions-${id}`}>
      Ações
    </button>
  ),
}))

vi.mock('swr', () => ({
  __esModule: true,
  default: vi.fn(),
}))

import useSWR from 'swr'
import { AdminBeveragesPage } from '.'

const mockBeverages = [
  {
    id: '1',
    name: 'Cerveja Pilsen',
    type: 'Cerveja',
    description: 'Cerveja clara e refrescante',
    price: 12.50,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Vodka Premium',
    type: 'Destilado',
    description: 'Vodka importada de alta qualidade',
    price: 150.00,
    created_at: '2024-02-10T14:20:00Z',
  },
  {
    id: '3',
    name: 'Vinho Tinto',
    type: 'Vinho',
    description: 'Vinho tinto seco',
    price: 89.90,
    created_at: '2024-03-05T09:15:00Z',
  },
]

describe('AdminBeveragesPage', () => {
  const mockNavigate = vi.fn()
  const mockMutate = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
  })

  it('redireciona para login quando não há token', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: null,
      user: null,
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)
    
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('exibe carregando enquanto busca bebidas', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)
    
    expect(screen.getByText('Carregando bebidas...')).toBeInTheDocument()
  })

  it('exibe erro ao carregar bebidas', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)
    
    expect(screen.getByText('Erro ao carregar bebidas')).toBeInTheDocument()
  })

  it('exibe lista de bebidas com informações corretas', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    expect(screen.getByText('Gerenciar bebidas')).toBeInTheDocument()
    expect(screen.getByText('Admin User')).toBeInTheDocument()

    expect(screen.getByText('Cerveja Pilsen')).toBeInTheDocument()
    expect(screen.getByText('Cerveja')).toBeInTheDocument()
    expect(screen.getByText('Cerveja clara e refrescante')).toBeInTheDocument()
    expect(screen.getByText('R$ 12.50')).toBeInTheDocument()

    expect(screen.getByText('Vodka Premium')).toBeInTheDocument()
    expect(screen.getByText('Destilado')).toBeInTheDocument()
    expect(screen.getByText('Vodka importada de alta qualidade')).toBeInTheDocument()
    expect(screen.getByText('R$ 150.00')).toBeInTheDocument()

    expect(screen.getByText('Vinho Tinto')).toBeInTheDocument()
    expect(screen.getByText('Vinho')).toBeInTheDocument()
    expect(screen.getByText('Vinho tinto seco')).toBeInTheDocument()
    expect(screen.getByText('R$ 89.90')).toBeInTheDocument()
  })

  it('filtra bebidas por nome', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar bebidas...')
    fireEvent.change(searchInput, { target: { value: 'Cerveja' } })

    expect(screen.getByText('Cerveja Pilsen')).toBeInTheDocument()
    expect(screen.queryByText('Vodka Premium')).not.toBeInTheDocument()
    expect(screen.queryByText('Vinho Tinto')).not.toBeInTheDocument()
  })

  it('filtra bebidas por tipo', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar bebidas...')
    fireEvent.change(searchInput, { target: { value: 'Destilado' } })

    expect(screen.queryByText('Cerveja Pilsen')).not.toBeInTheDocument()
    expect(screen.getByText('Vodka Premium')).toBeInTheDocument()
    expect(screen.queryByText('Vinho Tinto')).not.toBeInTheDocument()
  })

  it('filtro não é case sensitive', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar bebidas...')
    fireEvent.change(searchInput, { target: { value: 'CERVEJA' } })

    expect(screen.getByText('Cerveja Pilsen')).toBeInTheDocument()
    expect(screen.queryByText('Vodka Premium')).not.toBeInTheDocument()
  })

  it('exibe dados vazios quando beveragesComplete é undefined', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: {},
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.queryByText('Cerveja Pilsen')).not.toBeInTheDocument()
  })

  it('chama mutate quando BeverageModal é criado', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    const addBeverageButton = screen.getByTestId('beverage-modal')
    fireEvent.click(addBeverageButton)

    expect(mockMutate).toHaveBeenCalled()
  })

  it('chama mutate quando TableActions é executado', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    const tableActionsButton = screen.getByTestId('table-actions-1')
    fireEvent.click(tableActionsButton)

    expect(mockMutate).toHaveBeenCalled()
  })

  it('renderiza botão de filtros', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { beveragesComplete: mockBeverages },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBeveragesPage />)

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })
})
