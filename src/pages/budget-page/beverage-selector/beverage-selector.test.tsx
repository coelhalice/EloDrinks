/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest'
import { BeverageSelector } from '.'
import { useBudget } from '@/contexts/budget-context'

vi.mock('@/contexts/budget-context', () => ({
  useBudget: vi.fn(),
}))

vi.mock('swr', () => ({
  __esModule: true,
  default: vi.fn(),
}))

import useSWR from 'swr'

describe('BeverageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe carregando enquanto busca dados', () => {
    ;(useSWR as unknown as Mock).mockReturnValue({ isLoading: true })
    ;(useBudget as any).mockReturnValue({
      data: { beverages: {} },
      updateBeverage: vi.fn(),
      budget: 0,
    })

    render(<BeverageSelector />)
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('exibe erro ao carregar bebidas', () => {
    ;(useSWR as unknown as Mock).mockReturnValue({
      isLoading: false,
      error: true,
    })
    ;(useBudget as any).mockReturnValue({
      data: { beverages: {} },
      updateBeverage: vi.fn(),
      budget: 0,
    })

    render(<BeverageSelector />)
    expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument()
  })

  it('exibe lista de bebidas agrupadas e total do orçamento', () => {
    ;(useSWR as unknown as Mock).mockReturnValue({
      isLoading: false,
      error: false,
      data: {
        beveragesComplete: [
          {
            id: '1',
            name: 'Coca',
            type: 'Refrigerante',
            description: 'Coca-Cola',
            price: 5,
          },
          {
            id: '2',
            name: 'Pepsi',
            type: 'Refrigerante',
            description: 'Pepsi',
            price: 4,
          },
          {
            id: '3',
            name: 'Água',
            type: 'Água',
            description: 'Água mineral',
            price: 2,
          },
        ],
      },
    })

    ;(useBudget as any).mockReturnValue({
      data: { beverages: { '1': true, '3': true } },
      updateBeverage: vi.fn(),
      budget: 11,
    })

    render(<BeverageSelector />)
    expect(screen.getByText('REFRIGERANTE')).toBeInTheDocument()
    expect(screen.getByText('ÁGUA')).toBeInTheDocument()

    expect(screen.getByText('Coca')).toBeInTheDocument()
    const pepsiCard = screen.getByText('R$ 4,00').closest('div')
    console.log('pepsiCard', pepsiCard)
    const pepsiTexts = within(pepsiCard!).getAllByText('Pepsi')

    expect(
      pepsiTexts.find(el => el.className.includes('font-medium')),
    ).toBeInTheDocument()


    expect(screen.getByText('R$ 5,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 4,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2,00')).toBeInTheDocument()
    expect(screen.getByText('Total:')).toBeInTheDocument()
    expect(screen.getByText('R$ 11,00')).toBeInTheDocument()
  })
})
