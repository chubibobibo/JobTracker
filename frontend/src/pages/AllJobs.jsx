//imports for gridv2
import Box from "@mui/material/Box";

//import custom css
import "../utils/styles/AllJobStyles.css";

//import reusable components
import JobContainer from "../components/JobContainer.jsx";

//toast alerts
import { toast } from "react-toastify";

import SearchContainer from "../components/SearchContainer.jsx";

//hook that allows us to use data from a loader function (like action function) that we will create
//we will need to instantiate useLoaderData to a varaible in order to access the data obtained by the loader function we created.
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

//creating context
import { createContext } from "react";

//loader function
//passing the request body because it contains the url property
export const loader = async ({ request }) => {
  console.log(request);
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const allJobs = await axios.get("/api/jobs/", { params });
    // console.log(allJobs);
    return allJobs;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

//creating context that we will use to wrap around the components that we need data to be passed on to (instead of passing as props).
export const AllJobsContext = createContext();

function AllJobs() {
  //instantiate the useLoaderData() to obtain the data from the loader function we created then use it in the Login component.
  const allJobs = useLoaderData();
  // console.log(allJobs);

  const navigate = useNavigate();

  //function to delete a specific job
  const deleteJob = async (id) => {
    try {
      const deletedJob = await axios.delete(`/api/jobs/${id}`);
      toast.success("Job entry deleted");
      navigate("/dashboard");
      return deletedJob;
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className='allJobContainer'>
      <Box sx={{ flexGrow: 1 }} className='boxContainer'>
        {/* wrap the rendered components with context we created (AllJobsContext) then provide the value we want to pass */}
        <AllJobsContext.Provider value={{ allJobs, deleteJob }}>
          <SearchContainer />
          <JobContainer />
        </AllJobsContext.Provider>
      </Box>
    </div>
  );
}

export default AllJobs;
