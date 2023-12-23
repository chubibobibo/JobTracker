import { Link } from "react-router-dom";

//import formComponent
import RegFormComponent from "../components/RegFormComponent.jsx";

//custom css
import "../utils/styles/registerFormContainer.css";

//matertialUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Login() {
  return (
    <div className='registerContainer'>
      <form action='' className='regForm'>
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
      </form>
    </div>
  );
}
export default Login;
