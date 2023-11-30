import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Login from "@/pages/login/Login";
import Table from "@/pages/table/Table";
import About from "@/pages/about/About";
import Home from "@/pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    
    children: [
      {
        path: "home",
        element: <Home/>,
        index:true,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "test",
        element: <div>Test</div>,
      },
      {
        path: "table",
        element: <Table/>,
      },
    ],
  },
]);
