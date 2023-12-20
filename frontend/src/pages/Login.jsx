import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <p>No account yet?</p>
      <Link to='/register'>Register</Link>
    </div>
  );
}
export default Login;
