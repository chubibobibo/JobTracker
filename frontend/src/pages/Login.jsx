//importing Form component to change the form element when implementing react router action.
import { Link, Form, redirect } from "react-router-dom";

//import formComponent
import RegFormComponent from "../components/RegFormComponent.jsx";

//custom css
import "../utils/styles/registerFormContainer.css";

//import
import axios from "axios";
//matertialUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//react router action.
//accepts the request from the form
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the forms.
  const data = Object.fromEntries(formData); //converts the data obtained from the forms to a usable <object data="" type="" className=""></object>
  try {
    await axios.post("/api/users/login", data);
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return err;
  }
};

function Login() {
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
          <Button variant='contained' color='success' type='submit'>
            Register
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
export default Login;
