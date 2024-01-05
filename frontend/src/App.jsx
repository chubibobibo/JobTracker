import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages import
import HomeLayout from "./pages/HomeLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Landing from "./pages/Landing.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AddJob from "./pages/AddJob.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import EditJob from "./pages/EditJob.jsx";

//react router action imports
import { action as registerAction } from "./pages/Register.jsx";

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
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <AddJob />,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
            },
            {
              path: "edit-job/:id", //specifying a param for a way to obtain a specific job entry
              element: <EditJob />,
            },
          ],
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
