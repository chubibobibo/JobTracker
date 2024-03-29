import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";

//toast alerts
import { toast } from "react-toastify";
import axios from "axios";

//importing context created
import DashboardContext from "../customHooks/DashboardContext.js";

//implement loader function to obtain the data of logged in user
export const loader = async () => {
  try {
    const loggedUser = await axios.get("/api/admin/current-user");
    // console.log(loggedUser);
    return loggedUser;
  } catch (err) {
    toast.error(err);
    console.log(err);
    return err;
  }
};

function DashboardLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false); //state for darkmode
  const navigate = useNavigate();

  //obtain data from loader and save it to a var, we will be passing it to the Navbar component using DashboardContext.
  const user = useLoaderData();

  //function to toggle dark mode
  //we will need thid function to be accessible to the navbar component using context instead of prop drilling.
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    console.log(isDarkMode);
    //modify dom (documnet.body.classList) using .toggle which accepts 2 arguments. First is the css class that we will be activating (dark-theme) living in the index.css. Second argument is  a force (newDarkMode) that will return a boolean. This will force the class to be active whenever it is true. The reason why we saved !isDarkMode into a variable.
    document.body.classList.toggle("dark-theme", newDarkMode);
    localStorage.setItem("darkTheme", newDarkMode);
    console.log("dark theme toggled");
  };

  //logging out user
  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      navigate("/");
      toast.success("User logged out");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    //using the context we created (DashboardContext with .provider to wrap around the components that we will be sharing data with.)
    //then providing values in the context provider that we will be passing
    <div>
      <DashboardContext.Provider
        value={{
          toggleDarkMode,
          isDarkMode,
          logoutUser,
          user,
        }}
      >
        <Navbar />
        <Outlet context={user} />
      </DashboardContext.Provider>
    </div>
  );
}
export default DashboardLayout;
