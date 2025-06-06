import { test, expect } from '@playwright/test'

test.describe('BudgetPage', () => {
  test('should render the page and finish budget', async ({ page }) => {
    // Acesse a rota da página, supondo que ela seja /budget
    await page.goto('http://localhost:5173/orcamento')

    // Verifica o título
    await expect(page.getByRole('heading', { name: 'Monte seu orçamento' })).toBeVisible()

    // Verifica o parágrafo
    await expect(page.getByText('Escolha as bebidas e serviços que deseja incluir no seu evento.')).toBeVisible()

    // Verifica se o botão existe
    const button = page.getByRole('button', { name: /Fechar Orçamento/i })
    await expect(button).toBeVisible()

    // Clica no botão e verifica o comportamento (aqui depende do que `handleBudgetFinish` faz)
    await button.click()

    // Verificação pós-clique (exemplo: redirecionamento, alerta, etc.)
    // await expect(page).toHaveURL('/confirmacao') ou await page.getByText('Orçamento finalizado').toBeVisible()
  })
})
