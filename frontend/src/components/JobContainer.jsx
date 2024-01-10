//imports for gridv2
import Grid from "@mui/material/Unstable_Grid2";

//import Item (needed in the gridv2 styles) reused from customAddJobCss
import { Item } from "../utils/customCss/customAddJobCss.js";

//allows use of the contexxt created in the parent component (AllJobs.jsx)
import { useContext } from "react";
//import the context we created in the parent component
import { AllJobsContext } from "../pages/AllJobs.jsx";

//import custom css
import "../utils/styles/AllJobStyles.css";

function JobContainer() {
  const jobsData = useContext(AllJobsContext); //instantiate the created context (AllJobscontext) using useContext
  const { allJobs } = jobsData; //destructure the data passed from the created context to access it.
  console.log(allJobs);
  return (
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
  );
}
export default JobContainer;
