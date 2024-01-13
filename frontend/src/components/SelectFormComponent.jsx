import { useState } from "react";
import Box from "@mui/material/Box";

//MUI select input field
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/Select";

function SelectFormComponent({
  selectData,
  handleChange,
  label,
  status,
  defaultValues,
}) {
  console.log(defaultValues);
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
              value={selectData.jobStatus}
              label={label}
              onChange={handleChange}
              // defaultValue={selectData.jobStatus}
            >
              <MenuItem value={status.pending}>{status.pending}</MenuItem>
              <MenuItem value={status.interview}>{status.interview}</MenuItem>
              <MenuItem value={status.declined}>{status.declined}</MenuItem>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
    </>
  );
}
export default SelectFormComponent;
