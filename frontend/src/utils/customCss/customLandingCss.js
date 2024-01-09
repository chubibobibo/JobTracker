//import materialUI
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";

//custom css for Item component
export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

//custom css for button
export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  "&:hover": {
    backgroundColor: green[900],
  },
  margin: 6, //added to create a margin
}));
