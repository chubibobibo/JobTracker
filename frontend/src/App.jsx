import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages import
import HomeLayout from "./pages/HomeLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      //using errorElement to render a page if an error is encountered
      errorElement: <ErrorPage />,
      //children renders an array of object of other pages
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register", //did not include '/' because register's path is relative to HomeLayout
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
