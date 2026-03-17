import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegionSelection } from "./components/RegionSelection";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/region",
    Component: RegionSelection,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
