import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MidContent from '.';


describe('MidContent', () => {
  it('renderiza o título e a descrição principal', () => {
    render(<MidContent />);
    
    expect(screen.getByText('Bem-vindo à Elo Drinks!')).toBeInTheDocument();
    expect(screen.getByText(/transformamos eventos em experiências inesquecíveis/i)).toBeInTheDocument();
  });

  it('renderiza todos os pacotes corretamente', () => {
    render(<MidContent />);
      expect(screen.getByText('OPEN BAR COMPLETO')).toBeInTheDocument();
    expect(screen.getByText('OPEN BAR REDUZIDO')).toBeInTheDocument();
    expect(screen.getByText('OPEN BAR PERSONALIZADO')).toBeInTheDocument();
    expect(screen.getByText('Drinks Clássicos + Autorais')).toBeInTheDocument();
    expect(screen.getByText('Seleção De Drinks Menor')).toBeInTheDocument();
    expect(screen.getByText('Escolha Seus Drinks')).toBeInTheDocument();
  });

  it('renderiza todas as imagens dos pacotes', () => {
    render(<MidContent />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    expect(images[0]).toHaveAttribute('src', '/lp-1-2.png');
    expect(images[1]).toHaveAttribute('src', '/lp-2-2.png');
    expect(images[2]).toHaveAttribute('src', '/lp-3-2.png');
  });

  it('renderiza os botões de personalizar para cada pacote', () => {
    render(<MidContent />);
    
    const buttons = screen.getAllByRole('button', { name: /personalizar/i });
    expect(buttons).toHaveLength(3);
      buttons.forEach(button => {
      expect(button).toHaveClass(
        'text-xl',
        'border-1',
        'border-[#101820]',
        'text-[#101820]',
        'rounded-full'
      );
    });
  });
  it('mantém a estrutura visual correta', () => {
    const { container } = render(<MidContent />);
      const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-[#963F0E]', 'text-[#fff]');
    expect(screen.getByText(/ideal para eventos sofisticados/i)).toBeInTheDocument();
    expect(screen.getByText(/uma opção mais enxuta/i)).toBeInTheDocument();
    expect(screen.getByText(/monte seu próprio bar/i)).toBeInTheDocument();
  });
});
