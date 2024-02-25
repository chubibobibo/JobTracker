import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

//create action function to call the delete job api
//params as argument to obtain data from the id of the job from the url
export const action = async ({ params }) => {
  //there's no data to be  obtained from the form
  try {
    axios.delete(`/api/jobs/${params.id}`);
    toast.success("Job deleted");
    return redirect("/dashboard/all-jobs");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DeleteJob() {
  return <div>DeleteJob</div>;
}
export default DeleteJob;
