import { Link } from "react-router-dom";
//imports materialUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

//import css styles
import "../utils/styles/LandingPageStyles.css";

function Landing() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid sm={10} md={6} className='landingGrid1'>
          <Item>
            <h1 className='landingPar'>
              <img src='favicon.ico' alt='' className='landingIcon' />
              Job Tracker App
            </h1>
            <h3>Track and manage your job applications</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio totam doloribus error nam tenetur aperiam omnis culpa
              eos, placeat nihil vel quisquam harum obcaecati voluptas, eveniet
              pariatur eius enim repellendus.
            </p>
            <Link to='/register'>Register</Link>
            <br />
            <Link to='/login'>Login</Link>
          </Item>
        </Grid>
        <Grid md={6} sm={0} xs={0} className='landingGrid2'>
          <div>
            <img
              src='https://images.unsplash.com/photo-1519720842496-c64a0d0627f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGpvYiUyMGFwcGxpY2F0aW9ufGVufDB8fDB8fHww'
              alt=''
              className='landingLogo'
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Landing;
