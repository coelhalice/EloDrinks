import { render, screen } from "@testing-library/react";
import { BudgetDetails } from "./index";
import '@testing-library/jest-dom'
import { useBudget } from "@/contexts/budget-context";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi, Mock, afterEach } from 'vitest'

vi.mock('@/contexts/budget-context', () => ({
  useBudget: vi.fn(),
}));

describe("BudgetDetails", () => {
  const updateGuests = vi.fn();
  const updateCounters = vi.fn();
  const updateStaff = vi.fn();

  beforeEach(() => {
    (useBudget as Mock).mockReturnValue({
      updateGuests,
      updateCounters,
      updateStaff,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza os rótulos corretamente", () => {
    render(<BudgetDetails />);
    expect(screen.getByText("Número de convidados")).toBeInTheDocument();
    expect(screen.getByText("Balcão")).toBeInTheDocument();
    expect(screen.getByText("Funcionários")).toBeInTheDocument();
  });  it("permite selecionar número de convidados e chama updateGuests", async () => {
    render(<BudgetDetails />);
    const user = userEvent.setup();

    const guestsSelect = screen.getByRole("combobox", { name: /número de convidados/i });
    await user.click(guestsSelect);

    await screen.findByRole("listbox");
    
    const option = screen.getByRole("option", { name: "100" });
    await user.click(option);

    expect(updateGuests).toHaveBeenCalledWith(100);
  });  it("permite selecionar número de balcões e chama updateCounters", async () => {
    render(<BudgetDetails />);
    const user = userEvent.setup();

    const counterSelect = screen.getByRole("combobox", { name: /balcão/i });
    await user.click(counterSelect);

    await screen.findByRole("listbox");
    
    const option = screen.getByRole("option", { name: "2" });
    await user.click(option);

    expect(updateCounters).toHaveBeenCalledWith(2);
  });it("permite selecionar número de funcionários e chama updateStaff", async () => {
    render(<BudgetDetails />);
    const user = userEvent.setup();
    
    const staffSelect = screen.getByRole("combobox", { name: /funcionários/i });
    await user.click(staffSelect);

    await screen.findByRole("listbox");
    
    const option = screen.getByRole("option", { name: "15" });
    await user.click(option);

    expect(updateStaff).toHaveBeenCalledWith(15);
  });
});
