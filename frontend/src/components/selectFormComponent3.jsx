// import { useState } from "react";
import Box from "@mui/material/Box";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/Select";

function SelectFormComponent3({
  selectData,
  handleChange,
  label,
  status,
  // defaultValues,
}) {
  return (
    <>
      <div>
        <Box sx={{ minWidth: 120 }} className='inputBox'>
          <FormControl fullWidth size='small'>
            <InputLabel id={label}>{label}</InputLabel>
            <NativeSelect
              labelId={label}
              id={label}
              name={label}
              value={selectData.sort}
              label={label}
              onChange={handleChange}
              // defaultValue={selectData.jobStatus}
            >
              <MenuItem value={status.newest}>{status.newest}</MenuItem>
              <MenuItem value={status.oldest}>{status.oldest}</MenuItem>
              <MenuItem value={status.az}>{status.az}</MenuItem>
              <MenuItem value={status.za}>{status.za}</MenuItem>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
    </>
  );
}
export default SelectFormComponent3;
