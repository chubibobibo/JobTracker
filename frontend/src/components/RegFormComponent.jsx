//import material UI
import TextField from "@mui/material/TextField";

//custom css
import "../utils/styles/registerFormContainer.css";

// eslint-disable-next-line react/prop-types
function RegFormComponent({ label, name, type, defaultValues }) {
  return (
    <div>
      <div className='registerFormContainer'>
        {/* name */}
        <TextField
          id={name}
          label={label}
          variant='outlined'
          size='small'
          type={type}
          name={name}
          defaultValue={defaultValues}
        />
      </div>
    </div>
  );
}
export default RegFormComponent;
