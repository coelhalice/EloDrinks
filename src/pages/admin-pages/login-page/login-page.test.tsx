/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '.';

const mockLogin = vi.fn();
vi.mock('@/contexts/auth-context', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário de login corretamente', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logar/i })).toBeInTheDocument();
  });

  it('deve desabilitar o botão de submit quando os campos estão vazios', () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /logar/i });
    expect(submitButton).toBeDisabled();
  });

  it('deve desabilitar o botão quando o email é inválido', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const submitButton = screen.getByRole('button', { name: /logar/i });
    
    await user.type(emailInput, 'email-invalido');
    await user.type(senhaInput, 'senha123');
    
    expect(submitButton).toBeDisabled();
  });

  it('deve habilitar o botão quando email e senha são válidos', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const submitButton = screen.getByRole('button', { name: /logar/i });
    
    await user.type(emailInput, 'usuario@email.com');
    await user.type(senhaInput, 'senha123');
    
    expect(submitButton).toBeEnabled();
  });

  it('deve mostrar erro quando campos estão vazios no submit', async () => {
    render(<LoginPage />);
    
    const form = screen.getByRole('form');
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Preencha todos os campos');
    });
  });

  it('deve mostrar erro quando apenas email está preenchido', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'usuario@email.com');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Preencha todos os campos');
    });
  });

  it('deve mostrar erro quando apenas senha está preenchida', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(senhaInput, 'senha123');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Preencha todos os campos');
    });
  });

  it('deve mostrar erro para email inválido no submit', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'email-invalido');
    await user.type(senhaInput, 'senha123');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Email inválido');
    });
  });

  it('deve aceitar emails válidos com espaços e fazer trim', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, '  usuario@email.com  ');
    await user.type(senhaInput, '  senha123  ');
    
    mockLogin.mockResolvedValue(undefined);
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('usuario@email.com', 'senha123');
    });
  });

  it('deve chamar login com dados válidos', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'usuario@email.com');
    await user.type(senhaInput, 'senha123');
    
    mockLogin.mockResolvedValue(undefined);
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('usuario@email.com', 'senha123');
    });
  });

  it('deve mostrar erro quando login falha com Error', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'usuario@email.com');
    await user.type(senhaInput, 'senha123');
    
    const errorMessage = 'Credenciais inválidas';
    mockLogin.mockRejectedValue(new Error(errorMessage));
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    });
  });

  it('deve mostrar erro genérico quando login falha sem Error', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'usuario@email.com');
    await user.type(senhaInput, 'senha123');
    
    mockLogin.mockRejectedValue('Erro desconhecido');
    
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Erro ao fazer login');
    });
  });

  it('deve limpar erro após login bem-sucedido', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'email-invalido');
    await user.type(senhaInput, 'senha123');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Email inválido');
    });
    
    await user.clear(emailInput);
    await user.type(emailInput, 'usuario@email.com');
    
    mockLogin.mockResolvedValue(undefined);
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('usuario@email.com', 'senha123');
    });
  });

  it('deve manter erro até novo submit com dados válidos', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    const form = screen.getByRole('form');
    
    await user.type(emailInput, 'email-invalido');
    await user.type(senhaInput, 'senha123');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Email inválido');
    });
    
    await user.clear(emailInput);
    await user.type(emailInput, 'usuario@email.com');
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Email inválido');
    
    mockLogin.mockResolvedValue(undefined);
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('usuario@email.com', 'senha123');
    });
  });

  describe('Validação de email', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.com',
      'user+tag@example.co.uk',
      'user123@test-domain.com',
    ];
    
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'user@',
      'user@.com',
      'user space@example.com',
      '',
      '   ',
    ];

    validEmails.forEach(email => {
      it(`deve aceitar email válido: ${email}`, async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        
        const emailInput = screen.getByLabelText(/seu e-mail/i);
        const senhaInput = screen.getByLabelText(/sua senha/i);
        const submitButton = screen.getByRole('button', { name: /logar/i });
        
        await user.type(emailInput, email);
        await user.type(senhaInput, 'senha123');
        
        expect(submitButton).toBeEnabled();
      });
    });

    invalidEmails.forEach(email => {
      if (email.trim() === '') {
        it(`deve rejeitar email vazio`, async () => {
          const user = userEvent.setup();
          render(<LoginPage />);
          
          const emailInput = screen.getByLabelText(/seu e-mail/i);
          const senhaInput = screen.getByLabelText(/sua senha/i);
          const submitButton = screen.getByRole('button', { name: /logar/i });
          
          await user.clear(emailInput);
          await user.type(senhaInput, 'senha123');
          
          expect(submitButton).toBeDisabled();
        });
        return;
      }

      it(`deve rejeitar email inválido: "${email}"`, async () => {
        const user = userEvent.setup();
        render(<LoginPage />);
        
        const emailInput = screen.getByLabelText(/seu e-mail/i);
        const senhaInput = screen.getByLabelText(/sua senha/i);
        const submitButton = screen.getByRole('button', { name: /logar/i });
        
        await user.type(emailInput, email);
        await user.type(senhaInput, 'senha123');
        
        expect(submitButton).toBeDisabled();
      });
    });
  });

  it('deve ter acessibilidade adequada', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(senhaInput).toHaveAttribute('id', 'senha');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(senhaInput).toHaveAttribute('type', 'password');
    expect(emailInput).toHaveAttribute('required');
    expect(senhaInput).toHaveAttribute('required');
  });

  it('deve manter o estado do formulário durante interações', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/seu e-mail/i);
    const senhaInput = screen.getByLabelText(/sua senha/i);
    
    await user.type(emailInput, 'usuario@email.com');
    await user.type(senhaInput, 'senha123');
    
    expect(emailInput).toHaveValue('usuario@email.com');
    expect(senhaInput).toHaveValue('senha123');
    
    mockLogin.mockRejectedValue(new Error('Erro de teste'));
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    expect(emailInput).toHaveValue('usuario@email.com');
    expect(senhaInput).toHaveValue('senha123');
  });
});