import { createBrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import App from '@/presentation/app'
import { Quote } from '@/presentation/app/pages/quote/quote'
import { LandingPage } from '@/presentation/app/pages/landing-page/lading-page'
import { AdminPanel } from '@/presentation/app/pages/manage/AdminPanel'
import { LoginPage } from '@/presentation/app/pages/manage/LoginPage'

const router = createBrowserRouter([
  {
    path: AppRoutes.BASE.key,
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: AppRoutes.BASE.PAGES.quote,
        element: <Quote />,
      },
      {
        path: AppRoutes.BASE.PAGES.OrcamentoAdmin,
        element: <AdminPanel />,
      },
      {
        path: AppRoutes.BASE.PAGES.login,
        element: <LoginPage />,
      }
    ],
  },
])

export { router }
