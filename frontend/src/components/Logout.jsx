import { useState } from "react";

function Logout() {
  const { isLogout, setIsLogout } = useState(false);

  const handleClick = () => {
    setIsLogout(!isLogout);
  };

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}
export default Logout;
