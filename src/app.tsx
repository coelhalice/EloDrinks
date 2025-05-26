import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import { LandingPage } from './pages/landing-page/index.tsx'
import { LoginPage } from './pages/admin-pages/login-page'
import { AdminLayout } from './pages/admin-pages/admin-layout'
import { AdminUsersPage } from './pages/admin-pages/admin-users'
import { AdminBeveragesPage } from './pages/admin-pages/admin-beverages'
import BudgetPage from './pages/budget-page'
import { BudgetProvider } from './contexts/budget-context'
import CheckoutPage from './pages/checkout-page'
import { AdminBudgetsPage } from './pages/admin-pages/admin-budgets'


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BudgetProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/orcamento" element={<BudgetPage />}/>
            <Route path="/orcamento/:id" element={<CheckoutPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/admin" element={<AdminLayout children={<AdminUsersPage />} />}/>
            <Route path="/admin/beverages" element={<AdminLayout children={<AdminBeveragesPage />} />}/>
            <Route path="/admin/budgets" element={<AdminLayout children={<AdminBudgetsPage />} />}/>
          </Routes>
        </BudgetProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
