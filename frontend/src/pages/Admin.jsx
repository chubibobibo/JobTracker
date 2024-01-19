import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { useLoaderData, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//MUI
import { Item } from "../utils/customCss/customAddJobCss";
//css
import "../utils/styles/AdminStyles.css";

//react-icons
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

//loader function
export const loader = async () => {
  try {
    const adminData = await axios.get("/api/admin/app-stats");
    // console.log(adminData);
    return adminData;
  } catch (err) {
    console.log(err);
    toast.error("Problem loading admin data");
  }
};

function Admin() {
  //using data from loader function
  const adminData = useLoaderData();
  //   console.log(adminData);
  return (
    <div className='adminContainer'>
      <Box sx={{ flexGrow: 1 }} margin={"1rem"}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Item sx={{ backgroundColor: "lightBlue" }}>
              <div className='totalJobsContainer'>
                <p className='jobTitle'>Total jobs:</p>
                <p className='jobTitle'> {adminData.data.totalJobs}</p>
              </div>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item sx={{ backgroundColor: "pink" }}>
              <div className='totalJobsContainer'>
                <p className='jobTitle'>Total users:</p>
                <p className='jobTitle'> {adminData.data.totalUsers}</p>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default Admin;
