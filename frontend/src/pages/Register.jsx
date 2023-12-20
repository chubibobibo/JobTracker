import { Link } from "react-router-dom";
function Register() {
  return (
    <div>
      <h1>Register</h1>
      <p>Already have an account?</p>
      <Link to='/login'>Login</Link>
    </div>
  );
}
export default Register;
