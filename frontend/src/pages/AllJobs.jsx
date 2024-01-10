//imports for gridv2
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

//import Item (needed in the gridv2 styles) reused from customAddJobCss
import { Item } from "../utils/customCss/customAddJobCss.js";

//import custom css
import "../utils/styles/AllJobStyles.css";

function AllJobs() {
  return (
    <div className='allJobContainer'>
      <Box sx={{ flexGrow: 1 }} className='boxContainer'>
        <div>
          <Grid container spacing={2} className='gridContainer'>
            <Grid maxWidth='35rem' xs={6}>
              <Item>xs=8</Item>
            </Grid>
            <Grid maxWidth='35rem' xs={6}>
              <Item>xs=4</Item>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={2} className='gridContainer'>
            <Grid maxWidth='35rem' xs={6}>
              <Item>xs=4</Item>
            </Grid>
            <Grid maxWidth='35rem' xs={6}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
}
export default AllJobs;
