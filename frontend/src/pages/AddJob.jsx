import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

import { Form, redirect } from "react-router-dom";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import custom styles for MUI
import { Item } from "../utils/customCss/customAddJobCss.js";
//import custom css for aligning layout
import "../utils/styles/AddJobStyles.css";
//import the input reusbale input fields
import RegFormComponent from "../components/RegFormComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";

//implementing react action
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms
  const data = Object.fromEntries(formData); //converts data to usable object
  console.log(data);
  try {
    await axios.post("/api/jobs/", data);
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return err;
  }
};

function AddJob() {
  //state to handle select input data
  const [selectData, setSelectData] = useState({
    jobStatus: "",
    jobType: "",
  });
  // const handleChange = (e) => {
  //   setSelectData({ [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    setSelectData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };

  return (
    <Form method='post'>
      <div className='addJobContianer'>
        <Box sx={{ flexGrow: 1 }}>
          <div className='header'>
            <h1>Add Job</h1>
          </div>
          <Grid container spacing={2} className='addJobGrid'>
            <Item className='addJobItem'>
              <Stack className='divStack'>
                <div className='firstRow'>
                  {" "}
                  <Grid maxWidth='35rem' xs={6}>
                    <RegFormComponent
                      label={"Company"}
                      name={"company"}
                      type={"text"}
                    />
                  </Grid>
                  <Grid maxWidth='35rem' xs={6}>
                    {" "}
                    <RegFormComponent
                      label={"Position"}
                      name={"position"}
                      type={"text"}
                    />
                  </Grid>
                </div>
                <div className='secondRow'>
                  <Box sx={{ minWidth: 120 }} className='inputBox'>
                    <FormControl fullWidth>
                      <InputLabel id='jobStatus'>Job Status</InputLabel>
                      <Select
                        labelId='jobStatus'
                        id='jobStatus'
                        name='jobStatus'
                        value={selectData.jobStatus}
                        label='Age'
                        onChange={handleChange}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"interview"}>Interview</MenuItem>
                        <MenuItem value={"declined"}>Declined</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 120 }} className='inputBox'>
                    <FormControl fullWidth>
                      <InputLabel id='jobType'>Job Type</InputLabel>
                      <Select
                        labelId='jobType'
                        id='jobType'
                        name='jobType'
                        value={selectData.jobType}
                        label='jobType'
                        onChange={handleChange}
                      >
                        <MenuItem value={"full-time"}>Full-Time</MenuItem>
                        <MenuItem value={"part-time"}>Part-Time</MenuItem>
                        <MenuItem value={"internship"}>Internship</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div>
                  <RegFormComponent
                    label={"Location"}
                    name={"jobLocation"}
                    type={"text"}
                  />
                </div>
                <div className='button'>
                  <ButtonComponent type={"submit"} label={"Create Job"} />
                </div>
              </Stack>
            </Item>
          </Grid>
        </Box>
      </div>
    </Form>
  );
}
export default AddJob;
