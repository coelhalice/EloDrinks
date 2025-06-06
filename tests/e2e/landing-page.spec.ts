import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('deve renderizar corretamente os componentes principais', async ({ page }) => {
    await page.goto('http://localhost:5173')

    // Verifica os textos principais
    await expect(page.getByText(/JOGA O COPO PRO ALTO/i)).toBeVisible();
    await expect(page.getByText(/VAMO BEBER!!/i)).toBeVisible();

    // Verifica botão
    const button = page.getByRole('button', { name: /Monte seu orçamento agora!/i });
    await expect(button).toBeVisible();
  });
});
