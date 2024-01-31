//importing Form component to change the form element when implementing react router action.
//useActionData hook allows us to access data in our components (for this project it will be an error object that wil lcontain a message)
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

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

//object that we will use to display a message if password is less than 8 chars.
const errors = {
  message: "",
};

//react router action.
//accepts the request from the form
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms.
  const data = Object.fromEntries(formData); //converts the data obtained from the forms to a usable <object data="" type="" className=""></object>

  //check whther password is more than 7 char. then access the error in the JSX to display the message
  if (data.password.length < 8) {
    errors.message = "Password must be atleast 8 characters";
    return errors;
  }
  try {
    await axios.post("/api/users/login", data);
    toast.success(`Welcome ${data.email}`);
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function Login() {
  //instantiate to a variable the useActionData hook. This will allow us to access the errors object that we will create.
  const errors = useActionData();

  //instantiate useNavigation()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //useNavigate to direct to a new page (must be used in the JSX unlike redirecct which is used in the component function)
  const navigate = useNavigate();

  //async function as event handler to call login API with test user credentials
  const loginTestUser = async () => {
    //object that contains the test user credentials which we will use as the data for the API call instead of from the rteqreq.body(form)
    const testUserData = {
      email: "test@gmail.com",
      password: "testtest",
    };
    //API call
    try {
      await axios.post("/api/users/login", testUserData);
      navigate("/dashboard");
      toast.success("Test drive the application");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className='registerContainer'>
      <Form method='post' className='regForm'>
        <Stack spacing={2}>
          <h1 className='regLabel'>Login</h1>
          {errors?.message && <p style={{ color: "red" }}>{errors.message}</p>}
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
          {/* type=button to avoid submititng the form */}
          <Button
            variant='contained'
            color='success'
            type='button'
            onClick={loginTestUser}
          >
            Test the app
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
export default Login;
