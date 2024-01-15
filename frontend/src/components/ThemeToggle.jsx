//imports to use data passed in the context
import DashboardContext from "../customHooks/DashboardContext";
import { useContext } from "react";

//react icons for dark and light mode
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

function ThemeToggle() {
  //destructure the value passed from DashboardContext.
  const context = useContext(DashboardContext);
  const { toggleDarkMode, isDarkMode } = context;
  console.log(isDarkMode);

  return <div>{isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}</div>;
}
export default ThemeToggle;
