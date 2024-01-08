import { useState } from "react";
import Box from "@mui/material/Box";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectFormComponent() {
  //state to handle select input data
  const [selectData, setSelectData] = useState({
    jobStatus: "",
    jobType: "",
  });

  const handleChange = (e) => {
    setSelectData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <Box sx={{ minWidth: 120 }} className='inputBox'>
        <FormControl fullWidth>
          <InputLabel id='jobStatus'>Job Status</InputLabel>
          <Select
            labelId='jobStatus'
            id='jobStatus'
            name='jobStatus'
            value={selectData.jobStatus}
            label='Age'
            onChange={handleChange}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"interview"}>Interview</MenuItem>
            <MenuItem value={"declined"}>Declined</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
export default SelectFormComponent;
