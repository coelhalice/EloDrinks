import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingPage } from './index.tsx';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.mock('./footer', () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>,
}));

vi.mock('./mid-content', () => ({
  default: () => <div data-testid="mid-content">Mid Content Component</div>,
}));

vi.mock('@/components/internal/header', () => ({
  Header: () => <div data-testid="header">Header Component</div>,
}));

describe('LandingPage', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  };

  it('renders all main components correctly', () => {
    renderComponent();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('mid-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays the main heading text', () => {
    renderComponent();

    expect(screen.getByText(/JOGA O COPO PRO ALTO/i)).toBeInTheDocument();
    expect(screen.getByText(/VAMO BEBER!!/i)).toBeInTheDocument();
  });

  it('navigates to budget page when clicking the budget button', async () => {
    renderComponent();
    const user = userEvent.setup();

    const budgetButton = screen.getByText(/Monte seu orçamento agora!/i);
    await user.click(budgetButton);

    expect(mockNavigate).toHaveBeenCalledWith('/orcamento');
  });
  it('has the correct background and styling', () => {
    renderComponent();

    const section = screen.getByRole('main', { hidden: true });
    expect(section).toHaveClass('bg-[url(\'/fundo1.png\')]');
    expect(section).toHaveClass('flex');
    expect(section).toHaveClass('flex-col');
  });
  it('renders the budget button with correct styling', () => {
    renderComponent();

    const button = screen.getByText(/Monte seu orçamento agora!/i);
    expect(button).toHaveClass('bg-[#9E430E]');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('hover:opacity-90');
  });

  it('renders the budget button with correct hover transformation', () => {
    renderComponent();

    const button = screen.getByText(/Monte seu orçamento agora!/i);
    expect(button).toHaveClass('relative');
    expect(button).toHaveClass('hover:-top-2');
  });
});
