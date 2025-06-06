import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '.';

describe('Footer', () => {
  it("renderiza o logo corretamente", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Elo Drinks");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/slogo.svg");
  });

  it("renderiza as informações de contato corretamente", () => {
    render(<Footer />);
    
    expect(screen.getByText("CONTATO")).toBeInTheDocument();
    
    const telefone = screen.getByRole("link", { name: "(11) 99466-3100" });
    expect(telefone).toBeInTheDocument();
    expect(telefone).toHaveAttribute("href", "tel:+5511994663100");
    
    const email = screen.getByRole("link", { name: "atendimento@elodrinks.com.br" });
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute("href", "mailto:atendimento@elodrinks.com.br");
  });

  it("renderiza as informações de redes sociais corretamente", () => {
    render(<Footer />);
    
    expect(screen.getByText("SIGA-NOS")).toBeInTheDocument();
    
    expect(screen.getByText("@elodrinks")).toBeInTheDocument();
    
    expect(screen.getByText("Elo Drinks e Eventos")).toBeInTheDocument();
  });

  it("mantém a estrutura visual correta", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    
    expect(footer).toHaveClass("bg-[#0A0F17]", "text-[#A8430C]");
    
    const contatoSection = screen.getByText("CONTATO").parentElement;
    expect(contatoSection).toHaveClass("flex", "flex-col", "gap-4");
  });
});
