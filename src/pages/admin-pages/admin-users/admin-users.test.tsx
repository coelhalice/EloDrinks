 
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

vi.mock('@/components/internal/userModal', () => ({
  UserModal: ({ onCreated }: { onCreated: () => void }) => (
    <button onClick={onCreated} data-testid="user-modal">
      Adicionar Usuário
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
import { AdminUsersPage } from '.'

const mockUsers = [
  {
    id: '1',
    first_name: 'João',
    last_name: 'Silva',
    email: 'joao@email.com',
    role: 'Admin',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    first_name: 'Maria',
    last_name: 'Santos',
    email: 'maria@email.com',
    role: 'User',
    created_at: '2024-02-10T14:20:00Z',
  },
  {
    id: '3',
    first_name: 'Pedro',
    last_name: 'Oliveira',
    email: 'pedro@email.com',
    role: 'Moderator',
    created_at: '2024-03-05T09:15:00Z',
  },
]

describe('AdminUsersPage', () => {
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

    render(<AdminUsersPage />)
    
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('exibe carregando enquanto busca usuários', () => {
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

    render(<AdminUsersPage />)
    
    expect(screen.getByText('Carregando usuários...')).toBeInTheDocument()
  })

  it('exibe erro ao carregar usuários', () => {
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

    render(<AdminUsersPage />)
    
    expect(screen.getByText('Erro ao carregar usuários')).toBeInTheDocument()
  })

  it('exibe lista de usuários com informações corretas', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    expect(screen.getByText('Gerenciar usuários')).toBeInTheDocument()
    expect(screen.getByText('Admin User')).toBeInTheDocument()

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('joao@email.com')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()

    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText('maria@email.com')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()

    expect(screen.getByText('Pedro Oliveira')).toBeInTheDocument()
    expect(screen.getByText('pedro@email.com')).toBeInTheDocument()
    expect(screen.getByText('Moderator')).toBeInTheDocument()

    expect(screen.getByText('15/01/2024')).toBeInTheDocument()
    expect(screen.getByText('10/02/2024')).toBeInTheDocument()
    expect(screen.getByText('05/03/2024')).toBeInTheDocument()
  })

  it('filtra usuários por nome', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar usuários...')
    fireEvent.change(searchInput, { target: { value: 'João' } })

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
    expect(screen.queryByText('Pedro Oliveira')).not.toBeInTheDocument()
  })

  it('filtra usuários por sobrenome', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar usuários...')
    fireEvent.change(searchInput, { target: { value: 'Santos' } })

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.queryByText('Pedro Oliveira')).not.toBeInTheDocument()
  })

  it('filtra usuários por email', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar usuários...')
    fireEvent.change(searchInput, { target: { value: 'pedro@email.com' } })

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
    expect(screen.getByText('Pedro Oliveira')).toBeInTheDocument()
  })

  it('exibe mensagem quando nenhum usuário corresponde ao filtro', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar usuários...')
    fireEvent.change(searchInput, { target: { value: 'UsuarioInexistente' } })

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
    expect(screen.queryByText('Pedro Oliveira')).not.toBeInTheDocument()

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('E-mail')).toBeInTheDocument()
  })

  it('chama mutate quando UserModal é criado', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const addUserButton = screen.getByTestId('user-modal')
    fireEvent.click(addUserButton)

    expect(mockMutate).toHaveBeenCalled()
  })

  it('chama mutate quando TableActions é executado', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const tableActionsButton = screen.getByTestId('table-actions-1')
    fireEvent.click(tableActionsButton)

    expect(mockMutate).toHaveBeenCalled()
  })

  it('filtro não é case sensitive', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    const searchInput = screen.getByPlaceholderText('Pesquisar usuários...')
    fireEvent.change(searchInput, { target: { value: 'JOÃO' } })

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
  })

  it('exibe dados vazios quando usersComplete é undefined', () => {
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

    render(<AdminUsersPage />)

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('E-mail')).toBeInTheDocument()
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
  })

  it('renderiza botão de filtros', () => {
    ;(useAuth as Mock).mockReturnValue({
      token: 'valid-token',
      user: { first_name: 'Admin', last_name: 'User' },
    })

    ;(useSWR as unknown as Mock).mockReturnValue({
      data: { usersComplete: mockUsers },
      isLoading: false,
      error: null,
      mutate: mockMutate,
    })

    render(<AdminUsersPage />)

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })
})