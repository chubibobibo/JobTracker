import { useState } from "react";
import axios from "axios";
//MUI text inputs
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

//needed for react action
import { Form, redirect } from "react-router-dom";

//needed to use data obtained from loader function
import { useLoaderData } from "react-router-dom";
//toast alert
import { toast } from "react-toastify";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import custom styles for MUI
import { Item } from "../utils/customCss/customAddJobCss.js";
//import the input reusbale input fields
import RegFormComponent from "../components/RegFormComponent.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";
import SelectFormComponent from "../components/SelectFormComponent.jsx";
import SelectFormComponent2 from "../components/SelectFormComponent2.jsx";

//loader function to obtain data from API and load it immediately
export const loader = async ({ params }) => {
  try {
    const jobData = await axios.get(`/api/jobs/${params.id}`); //we named it :id in the paths
    // console.log(jobData);
    return jobData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response.data.message[0]); // if more than 1 error in validation. will return an array, to access every error we need to specify the first location in array
    return err;
  }
};

//action function to send modified data
export const action = async ({ request, params }) => {
  //added params because API needs params as well
  const formData = await request.formData();
  const newData = Object.fromEntries(formData);
  try {
    await axios.patch(`/api/jobs/${params.id}`, newData);
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message[0]); // if more than 1 error in validation. will return an array, to access every error we need to specify the first location in array
    return err;
  }
};

function EditJob() {
  //instantiating loader data
  const loaderData = useLoaderData(); //obtain data from loader function then save to a var
  const singleJobData = loaderData.data.foundSingleJob; //obtaining the exact path of the data
  console.log(singleJobData);

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

  return (
    <div>
      <Form method='post'>
        <div className='addJobContianer'>
          <Box sx={{ flexGrow: 1 }}>
            <div className='header'>
              <h1>Edit Job</h1>
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
                        defaultValues={singleJobData.company}
                      />
                    </Grid>
                    <Grid maxWidth='35rem' xs={6}>
                      {" "}
                      <RegFormComponent
                        label={"Position"}
                        name={"position"}
                        type={"text"}
                        defaultValues={singleJobData.position}
                      />
                    </Grid>
                  </div>
                  <div className='secondRow'>
                    <SelectFormComponent
                      selectData={selectData}
                      handleChange={handleChange}
                      label={"jobStatus"}
                      status={statusObj}
                      defaultValues={singleJobData.jobStatus}
                    />
                    <SelectFormComponent2
                      selectData={selectData}
                      handleChange={handleChange}
                      label={"jobType"}
                      status={typeObj}
                      defaultValues={singleJobData.jobType}
                    />
                  </div>
                  <div>
                    <RegFormComponent
                      label={"Location"}
                      name={"jobLocation"}
                      type={"text"}
                      defaultValues={singleJobData.jobLocation}
                    />
                  </div>
                  <div className='button'>
                    <ButtonComponent type={"submit"} label={"Edit Job"} />
                  </div>
                </Stack>
              </Item>
            </Grid>
          </Box>
        </div>
      </Form>
    </div>
  );
}
export default EditJob;
