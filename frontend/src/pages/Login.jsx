//importing Form component to change the form element when implementing react router action.
import { Link, Form, redirect, useNavigation } from "react-router-dom";

//import formComponent
import RegFormComponent from "../components/RegFormComponent.jsx";

//custom css
import "../utils/styles/registerFormContainer.css";

//import
import axios from "axios";
//matertialUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//toastify alerts
import { toast } from "react-toastify";

//react router action.
//accepts the request from the form
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms.
  const data = Object.fromEntries(formData); //converts the data obtained from the forms to a usable <object data="" type="" className=""></object>
  // console.log(data);
  try {
    await axios.post("/api/users/login", data);
    toast.success(`Welcome ${data.email}`);
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error("Invalid email or password");
    return err;
  }
};

function Login() {
  //instantiate useNavigation()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className='registerContainer'>
      <Form method='post' className='regForm'>
        <Stack spacing={2}>
          <h1 className='regLabel'>Login</h1>
          <RegFormComponent type='email' label='email' name='email' />
          <RegFormComponent type='password' label='password' name='password' />
          <p>
            No account yet? <Link to='/register'>Register</Link>
          </p>
          <Button
            variant='contained'
            color='success'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
export default Login;
