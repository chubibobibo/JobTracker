//material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//import toggleTheme component
// import ThemeToggle from "./ThemeToggle.jsx";

//import useContext() to use the context we created.
import { useContext } from "react";

//import the context created
import DashboardContext from "../customHooks/DashboardContext";

import { Link } from "react-router-dom";

function Navbar() {
  //ontaining data from the context (DashboardContext)
  const context = useContext(DashboardContext);

  //obtaining data from the loader
  const { logoutUser, user } = context;
  // console.log(user);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Container maxWidth='lg'>
            <Toolbar>
              <Typography variant='h7' component='div' sx={{ flexGrow: 1 }}>
                <Link to='/dashboard/all-jobs'>
                  <Button style={{ color: "white" }} size='small'>
                    All Jobs
                  </Button>
                </Link>
                <Link to='/dashboard'>
                  <Button style={{ color: "white" }} size='small'>
                    Add Job
                  </Button>
                </Link>
                {/* hiding the admin button  */}
                {user?.data?.currentUser?.role === "admin" && (
                  <Link to='/dashboard/admin'>
                    <Button style={{ color: "white" }} size='small'>
                      Admin
                    </Button>
                  </Link>
                )}
              </Typography>
              {/* <div onClick={toggleDarkMode}>
                <ThemeToggle />
              </div> */}
              <Button color='inherit' onClick={logoutUser}>
                Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}
export default Navbar;
