import { Link, useRouteError } from "react-router-dom";
//import the 404 logo from assets to be used in the <img>
import logo from "../assets/404.svg";

//importing css
import "../utils/styles/ErrorPageStyles.css";

function ErrorPage() {
  const errors = useRouteError();
  console.log(errors);
  return (
    //using errors object (check the log for specific keys) to create a conditional what to display.
    <div>
      {errors.status === 404 ? (
        <div>
          <div className='logoContainer'>
            <img
              src={logo}
              alt='404 not found'
              height='450'
              width='450'
              className='logoError'
            />
          </div>
          <div className='container'>
            <h1>Sorry Page Not Found</h1>
          </div>
        </div>
      ) : (
        <div>{errors.error.message}</div>
      )}
      <Link to='/'>Back to Home</Link>
    </div>
  );
}
export default ErrorPage;
