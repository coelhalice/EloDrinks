import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CheckoutPage from '.';
import { BudgetProvider } from '@/contexts/budget-context';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';


vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    isAxiosError: vi.fn()
  }
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

const mockBudgetData = {
  id: '123',
  guests: 50,
  staff: 5,
  counters: 2,
  budget: 1500,
  beverages: {
    1: { id: 1, name: 'Cerveja', description: 'Cerveja Pilsen', price: 10.50 },
    2: { id: 2, name: 'Whisky', description: 'Whisky 12 anos', price: 150.00 }
  }
};

const mockResetBudget = vi.fn();


vi.mock('@/contexts/budget-context', () => ({
  useBudget: () => ({
    data: mockBudgetData,
    budget: 1500,
    resetBudget: mockResetBudget
  }),
  BudgetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <BudgetProvider>
          <CheckoutPage />
        </BudgetProvider>
      </BrowserRouter>
    );
  };

  it('renderiza o resumo do orçamento corretamente', () => {
    renderComponent();


    expect(screen.getByText('Resumo do Orçamento')).toBeInTheDocument();

    expect(screen.getByText('Cerveja')).toBeInTheDocument();
    expect(screen.getByText('Whisky')).toBeInTheDocument();
    expect(screen.getByText('R$ 10,50')).toBeInTheDocument();
    expect(screen.getByText('R$ 150,00')).toBeInTheDocument();


    expect(screen.getByText('Convidados: 50')).toBeInTheDocument();
    expect(screen.getByText('Funcionários: 5')).toBeInTheDocument();
    expect(screen.getByText('Balcões: 2')).toBeInTheDocument();

    expect(screen.getByText('Total: R$ 1500,00')).toBeInTheDocument();
  });

  it('valida o formato do email', async () => {
    renderComponent();
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText('Digite seu email');
    const submitButton = screen.getByText('Enviar orçamento');

    expect(submitButton).toBeDisabled();

    await user.type(emailInput, 'email-invalido');
    await user.click(submitButton);
    
    expect(submitButton).not.toBeDisabled();
  });

it('envia o orçamento com sucesso', async () => {
  vi.mocked(axios.post).mockResolvedValue({ data: {} });
  
  renderComponent();
  const user = userEvent.setup();

  const emailInput = screen.getByPlaceholderText('Digite seu email');
  const form = screen.getByRole('form');

  await user.type(emailInput, 'teste@email.com');
  
  fireEvent.submit(form);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3333/budgets', {
      id: '123',
      guests: 50,
      counters: 2,
      staff: 5,
      budget: 1500,
      beverageIds: [1, 2],
      email: 'teste@email.com'
    });
  });

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Orçamento enviado com sucesso!');
  });

  await waitFor(() => {
    expect(mockResetBudget).toHaveBeenCalled();
  }, { timeout: 2000 });
});
  
  it('exibe erro quando a submissão falha', async () => {
  renderComponent();
  const user = userEvent.setup();

  const axiosError = {
    isAxiosError: true,
    response: {
      data: {
        message: 'Servidor indisponível'
      }
    }
  };
  
  vi.mocked(axios.post).mockRejectedValue(axiosError);
  vi.mocked(axios.isAxiosError).mockReturnValue(true);

  const emailInput = screen.getByPlaceholderText('Digite seu email');
  const form = screen.getByRole('form');

  await user.type(emailInput, 'teste@email.com');
  
  fireEvent.submit(form);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3333/budgets', {
      id: '123',
      guests: 50,
      counters: 2,
      staff: 5,
      budget: 1500,
      beverageIds: [1, 2],
      email: 'teste@email.com'
    });
  });

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Erro ao criar orçamento: Servidor indisponível');
  });

  expect(mockResetBudget).not.toHaveBeenCalled();
});
});
