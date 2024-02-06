import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// import Dashboard from "./components/Dashboard";
import signupAction from "./pages/SignupPage"
import SigninPage, {action as signinAction} from "./pages/SigninPage";
import DashboardPage, {loader as dashboardData} from "./pages/DashboardPage";
import TransferModal, {action as TransferAction } from "./components/TransferModal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <SigninPage />, action:  signinAction},
        { path: "signup", element: <SignUp />, action: signupAction},
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      loader: dashboardData
    },
    {
      path: "/transfer",
      element: <TransferModal />,
      action: TransferAction
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
