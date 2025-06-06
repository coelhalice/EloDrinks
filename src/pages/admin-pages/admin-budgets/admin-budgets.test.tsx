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
import { AdminBudgetsPage } from '.'

const mockBudgets = [
  {
    id: '1',
    guests: 100,
    counters: 2,
    staff: 4,
    budget: 5000.00,
    email: 'evento1@email.com',
    created_at: '2024-01-15T10:30:00Z',
    beverages: [
      {
        id: 'bev1',
        name: 'Cerveja',
        type: 'Pilsen',
        description: 'Cerveja gelada',
        price: 10.00,
        created_at: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    guests: 200,
    counters: 3,
    staff: 6,
    budget: 8000.00,
    email: 'evento2@email.com',
    created_at: '2024-02-10T14:20:00Z',
    beverages: [
      {
        id: 'bev2',
        name: 'Vodka',
        type: 'Premium',
        description: 'Vodka importada',
        price: 150.00,
        created_at: '2024-02-10T14:20:00Z'
      }
    ]
  }
]

describe('AdminBudgetsPage', () => {
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

    render(<AdminBudgetsPage />)
    
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('exibe carregando enquanto busca orçamentos', () => {
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

    render(<AdminBudgetsPage />)
    
    expect(screen.getByText('Carregando orçamentos...')).toBeInTheDocument()
  })

  it('exibe erro ao carregar orçamentos', () => {
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

    render(<AdminBudgetsPage />)
    
    expect(screen.getByText('Erro ao carregar orçamentos')).toBeInTheDocument()
  })

  it('exibe lista de orçamentos com informações corretas', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { budgets: mockBudgets },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBudgetsPage />)

    expect(screen.getByText('Gerenciar orçamentos')).toBeInTheDocument()
    expect(screen.getByText('Admin User')).toBeInTheDocument()

    expect(screen.getByText('evento1@email.com')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('R$ 5000.00')).toBeInTheDocument()
    expect(screen.getByText(/Cerveja/)).toBeInTheDocument()
    expect(screen.getByText(/Pilsen/)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 10\.00/)).toBeInTheDocument()

    expect(screen.getByText('evento2@email.com')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('R$ 8000.00')).toBeInTheDocument()
    expect(screen.getByText(/Vodka/)).toBeInTheDocument()
    expect(screen.getByText(/Premium/)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 150\.00/)).toBeInTheDocument()
  })

  it('filtra orçamentos por email', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { budgets: mockBudgets },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBudgetsPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar orçamentos...')
    fireEvent.change(searchInput, { target: { value: 'evento1' } })

    expect(screen.getByText('evento1@email.com')).toBeInTheDocument()
    expect(screen.queryByText('evento2@email.com')).not.toBeInTheDocument()
  })

  it('filtro não é case sensitive', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { budgets: mockBudgets },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBudgetsPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar orçamentos...')
    fireEvent.change(searchInput, { target: { value: 'EVENTO1' } })

    expect(screen.getByText('evento1@email.com')).toBeInTheDocument()
    expect(screen.queryByText('evento2@email.com')).not.toBeInTheDocument()
  })

  it('exibe dados vazios quando budgets é undefined', () => {
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

    render(<AdminBudgetsPage />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Convidados')).toBeInTheDocument()
    expect(screen.queryByText('evento1@email.com')).not.toBeInTheDocument()
  })

  it('chama mutate quando TableActions é executado', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { budgets: mockBudgets },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBudgetsPage />)

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
      data: { budgets: mockBudgets },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminBudgetsPage />)

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })
})
