import { test, expect } from "@playwright/test";

test("login e navega para /admin", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  // Preenche email e senha
  await page.fill('[data-testid="email"]', "alice@gmail.com");
  await page.fill('[data-testid="senha"]', "123456");

  // Clica no botão de login
  await page.click('button[type="submit"]');

  // Espera redirecionar para /admin (ajuste se for outra URL)
  await page.waitForURL("http://localhost:5173/admin");

  // Verifica se URL está correta
  expect(page.url()).toBe("http://localhost:5173/admin");

  // Você pode adicionar mais asserts aqui para garantir que a página admin está visível
  await expect(page.locator("text=Gerenciar usuários")).toBeVisible();
});
