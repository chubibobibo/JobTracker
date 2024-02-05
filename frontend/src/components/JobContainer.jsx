//imports for gridv2
import Grid from "@mui/material/Unstable_Grid2";
import ButtonComponent from "./ButtonComponent.jsx";
import Button from "@mui/material/Button";

//import Item (needed in the gridv2 styles) reused from customAddJobCss
import { Item } from "../utils/customCss/customAddJobCss.js";

//allows use of the contexxt created in the parent component (AllJobs.jsx)
import { useContext } from "react";
//import the context we created in the parent component
import { AllJobsContext } from "../pages/AllJobs.jsx";

import { Link } from "react-router-dom";

//MUI alert when no jobs are found for a user
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//date formatter
import day from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
day.extend(advanceFormat);

//import custom css
import "../utils/styles/AllJobStyles.css";

//import react-icons
import { FaSuitcase } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";

function JobContainer() {
  const jobsData = useContext(AllJobsContext); //instantiate the created context (AllJobscontext) using useContext
  const { allJobs, deleteJob } = jobsData; //destructure the data passed from the created context to access it.
  //   console.log(allJobs.data.allJobs);
  const allJobsData = allJobs.data.allJobs; //save the array of job entries to a varibale to map it.
  // console.log(allJobsData);

  return (
    //map the data from the loader function
    //Grid component is like a div that we can set the size 12/12
    <Grid container spacing={2} className='allJobContainer'>
      {allJobsData.length !== 0 ? (
        allJobsData.map((newJobsData) => {
          //formatting the date from createdBy
          const date = day(newJobsData.createdAt).format("MMM Do, YYYY");
          return (
            <Grid
              key={newJobsData._id}
              maxWidth='35rem'
              xs={6}
              className='jobGridContainer'
            >
              <Item className='jobItem'>
                <Grid className='mainGrid'>
                  {/* one letter icon */}
                  <Grid className='mainIcon' xs={4}>
                    <h1 className='mainh1'> {newJobsData.company[0]}</h1>
                  </Grid>
                  <Grid xs={8} className={"companyName"}>
                    {newJobsData.company}
                  </Grid>
                </Grid>
                <Grid xs={12} className='secondaryGrid'>
                  <div className='position'>
                    <FaSuitcase className='icons' size='1.2rem' />
                    {newJobsData.position}
                  </div>
                  <div className='joblocation'>
                    <FaLocationDot className='icons' size='1.2rem' />
                    {newJobsData.jobLocation}
                  </div>
                  <div className='jobtype'>
                    <FaPen className='icons' size='1.2rem' />
                    {newJobsData.jobType}
                  </div>
                  <div className='date'>
                    <FaRegCalendarDays className='icons' size='1.2rem' /> {date}
                  </div>
                  {/* implementing dynamic style depending on the status using custom classNames */}
                  <div className={newJobsData.jobStatus}>
                    {newJobsData.jobStatus}
                  </div>
                  <br />
                </Grid>
                <div className='btnContainer'>
                  <div className='linkBtnContainer'>
                    <Link
                      className='linkbtn'
                      to={`/dashboard/edit-job/${newJobsData._id}`}
                    >
                      <ButtonComponent label={"Edit Job"} color={"info"} />
                    </Link>
                  </div>
                  <div className='linkBtnContainer'>
                    {/* <ButtonComponent label={"Delete Job"} color={"warning"} /> */}
                    <Button
                      variant='contained'
                      size='small'
                      color='info'
                      onClick={() => {
                        deleteJob(newJobsData._id);
                      }} //using a callback function because we need to pass an argument in the deleteJob function
                    >
                      Delete Job
                    </Button>
                  </div>
                </div>
              </Item>
            </Grid>
          );
        })
      ) : (
        <div className='alertContainer'>
          <Alert severity='warning'>
            <AlertTitle>No Job Entry Yet</AlertTitle>
            Soooo empty in here. Create your job Entry Now
            <Link to={"/dashboard"}> Create a job entry</Link>
          </Alert>
        </div>
      )}
    </Grid>
  );
}
export default JobContainer;
