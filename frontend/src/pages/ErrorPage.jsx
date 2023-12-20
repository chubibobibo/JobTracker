import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const errors = useRouteError();
  console.log(errors);
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <Link to='/'>Back to Home</Link>
    </div>
  );
}
export default ErrorPage;
