import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useState } from "react";

//importing context created
import DashboardContext from "../customHooks/DashboardContext.js";

function DashboardLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false); //state for darkmode

  const user = "Lester";

  //function to toggle dark mode
  //we will need thid function to be accessible to the navbar component using context instead of prop drilling.
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode);
  };

  //logging out user
  const logoutUser = () => {
    console.log("logout user");
  };

  return (
    //using the context we created (DashboardContext with .provider to wrap around the components that we will be sharing data with.)
    //then providing values in the context provider that we will be passing
    <div>
      <DashboardContext.Provider
        value={{
          toggleDarkMode,
          logoutUser,
        }}
      >
        <Navbar />
        <Outlet />
      </DashboardContext.Provider>
    </div>
  );
}
export default DashboardLayout;
