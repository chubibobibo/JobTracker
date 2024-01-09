import { useState } from "react";
import Box from "@mui/material/Box";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectFormComponent2({ selectData, handleChange, label, status }) {
  return (
    <>
      <div>
        <Box sx={{ minWidth: 120 }} className='inputBox'>
          <FormControl fullWidth>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              labelId={label}
              id={label}
              name={label}
              value={selectData.jobType}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={status.fullTime}>{status.fullTime}</MenuItem>
              <MenuItem value={status.partTime}>{status.partTime}</MenuItem>
              <MenuItem value={status.internship}>{status.internship}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
}
export default SelectFormComponent2;
