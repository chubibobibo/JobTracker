//import formComponent
import RegFormComponent from "../components/RegFormComponent.jsx";

//custom css
import "../utils/styles/registerFormContainer.css";

import { Link, Form, redirect } from "react-router-dom";
import axios from "axios";

//matertialUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//implement react router action that will accept the request (an object) sent by the form
export const action = async ({ request }) => {
  const formData = await request.formData(); //using formData() method to obtain data from the forms.
  const data = Object.fromEntries(formData); //converts the formData from the request body to usable objects.
  try {
    await axios.post("http://localhost:3001/api/users/register", data); //remember to use the proxy that we copied and change it's localhost to the one that we are using in the project.
    return redirect("/login"); //Note: every successful request needs to return a value.
  } catch (err) {
    console.log(err);
    return err;
  }
};

function Register() {
  return (
    <div className='registerContainer'>
      <Form className='regForm' method='post'>
        <Stack spacing={2}>
          <h1 className='regLabel'>Register</h1>
          <RegFormComponent type='text' label='name' name='name' />
          <RegFormComponent type='email' label='email' name='email' />
          <RegFormComponent type='password' label='password' name='password' />
          <RegFormComponent type='text' label='last name' name='lastName' />
          <RegFormComponent type='text' label='location' name='location' />
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
          <Button variant='contained' color='success' type='submit'>
            Register
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
export default Register;
