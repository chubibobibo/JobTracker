import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

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
import Admin from "./pages/Admin.jsx";

//react router action imports
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as newJobAction } from "./pages/AddJob.jsx";
import { action as editJobAction } from "./pages/EditJob.jsx";
import { loader as allJobsLoader } from "./pages/AllJobs.jsx";
import { loader as editJobLoader } from "./pages/EditJob.jsx";
import { loader as adminLoader } from "./pages/Admin.jsx";

//MUI dark theme
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from "@mui/material";

function App() {
  //create a state that will return a boolean. This will be used to whether apply the light or dark theme.
  const [mode, setMode] = useState(true);

  //NOTE: janky application of dark mode persistence. used useRef to obtain current value of mode then used useEffect to set the mode state to the previous value.
  const prevMode = useRef(mode);

  //creating a dark theme that we will pass to all the pages and components
  const theme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
      // mode: "dark",
    },
  });

  //Trial
  const toggler = () => {
    setMode(!mode);
  };

  //NOTE: janky application of dark mode persistence. used useRef to obtain current value of mode then used useEffect to set the mode state to the previous value.
  useEffect(() => {
    setMode(!prevMode.current);
    // setMode(!prevMode.current);
  }, [prevMode]);

  console.log(mode);

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
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: newJobAction,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
              loader: allJobsLoader,
            },
            {
              path: "edit-job/:id", //specifying a param for a way to obtain a specific job entry
              element: <EditJob />,
              loader: editJobLoader,
              action: editJobAction,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* switch with onClick event to cahnge the state (mode) to the opposite boolean value */}
        <Switch checked={!mode} onClick={toggler}>
          Dark Mode
        </Switch>
        <RouterProvider router={Router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
