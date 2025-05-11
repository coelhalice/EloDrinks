import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LandingPage } from './pages/landing-page/index.tsx'
import { LoginPage } from './pages/admin-pages/login-page'
import { AdminLayout } from './pages/admin-pages/admin-layout'
import { AdminUsersPage } from './pages/admin-pages/admin-users'
import { AdminBeveragesPage } from './pages/admin-pages/admin-beverages'


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminLayout children={<AdminUsersPage />} />}/>
        <Route path="/admin/beverages" element={<AdminLayout children={<AdminBeveragesPage />} />}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
