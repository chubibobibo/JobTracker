import { useState } from "react";
import axios from "axios";
//MUI text inputs
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

//needed for react action
import { Form, redirect } from "react-router-dom";
//toast alert
import { toast } from "react-toastify";

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
import SelectFormComponent from "../components/SelectFormComponent.jsx";
import SelectFormComponent2 from "../components/SelectFormComponent2.jsx";

//iomport objects for select input

//implementing react action
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms
  const data = Object.fromEntries(formData); //converts data to usable object
  console.log(data);
  try {
    await axios.post("/api/jobs/", data);
    toast.success("Job entry created");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    console.log(err);
    toast.error("Problem saving job entry");
    return err;
  }
};

function AddJob() {
  //state to handle multiple select input data
  const [selectData, setSelectData] = useState({
    jobStatus: "",
    jobType: "",
  });

  //object to use as the select input options
  const statusObj = {
    pending: "pending",
    interview: "interview",
    declined: "declined",
  };

  const typeObj = {
    fullTime: "full-time",
    partTime: "part-time",
    internship: "internship",
  };

  //handling changes in the select input
  const handleChange = (e) => {
    setSelectData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };
  // console.log(statusObj);
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
                  <SelectFormComponent
                    selectData={selectData}
                    handleChange={handleChange}
                    label={"jobStatus"}
                    status={statusObj}
                  />
                  <SelectFormComponent2
                    selectData={selectData}
                    handleChange={handleChange}
                    label={"jobType"}
                    status={typeObj}
                  />
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
