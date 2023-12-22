//import formComponent
import RegFormComponent from "../components/RegFormComponent.jsx";

//custom css
import "../utils/styles/registerFormContainer.css";

//matertialUI
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Register() {
  return (
    <div className='registerContainer'>
      <form action='' className='regForm'>
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
      </form>
    </div>
  );
}
export default Register;
