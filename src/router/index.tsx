import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import App from "@/presentation/app";
import { Quote } from "@/presentation/app/pages/quote/quote";
import { LandingPage } from "@/presentation/app/pages/landing-page/lading-page";

const router = createBrowserRouter([
  {
    path: AppRoutes.BASE.key,
    element: <App />,
    children: [
      {
        path: '/',
        element:<LandingPage/> ,
      },
      {
        path: AppRoutes.BASE.PAGES.quote,
        element: <Quote />,
      },
    ],
  },
]);

export { router };
