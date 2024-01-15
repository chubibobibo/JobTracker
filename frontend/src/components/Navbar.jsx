//material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

//import toggleTheme component
import ThemeToggle from "./ThemeToggle.jsx";

//import useContext() to use the context we created.
import { useContext } from "react";

//import the context created
import DashboardContext from "../customHooks/DashboardContext";

import { Link } from "react-router-dom";

function Navbar() {
  const context = useContext(DashboardContext);
  const { toggleDarkMode, logoutUser } = context;
  // console.log(cookies);

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
                {/* <Link to='/dashboard/all-jobs'>
                  <Button style={{ color: "white" }} size='small'>
                    Admin
                  </Button>
                </Link> */}
              </Typography>
              <div onClick={toggleDarkMode}>
                <ThemeToggle />
              </div>
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
