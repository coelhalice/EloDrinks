import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { LandingPage } from './app/pages/landing-page/index.tsx'
import { LoginPage } from './app/pages/admin-pages/login-page/index'
import { AdminLayout } from './app/pages/admin-pages/admin-layout/index'
import { AdminUsersPage } from './app/pages/admin-pages/admin-users/index'
import { AuthProvider } from '@/contexts/AuthContext.jsx'
import { AdminBeveragesPage } from './app/pages/admin-pages/admin-beverages/index.jsx'

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
