import { Link } from "react-router-dom";
//import material UI
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

//custom css
import "../utils/styles/registerFormContainer.css";

function Register() {
  return (
    <div className='registerContainer'>
      <form action='' className='regForm'>
        <div className='registerFormContainer'>
          <Stack spacing={2}>
            <h1 className='regLabel'>Register</h1>
            {/* name */}
            <TextField
              id='outlined-basic'
              label='Name'
              variant='outlined'
              size='small'
              type='text'
            />
            {/* email */}
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              size='small'
              type='email'
            />
            {/* password */}
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              size='small'
              type='password'
            />
            {/* last name */}
            <TextField
              id='outlined-basic'
              label='Last name'
              variant='outlined'
              size='small'
              type='text'
            />
            {/* location */}
            <TextField
              id='outlined-basic'
              label='Location'
              variant='outlined'
              size='small'
              type='text'
            />
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
            <Button variant='contained' color='success' type='submit'>
              Register
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
}
export default Register;
