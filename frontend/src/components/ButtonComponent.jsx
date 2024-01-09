import Button from "@mui/material/Button";
function ButtonComponent({ type, label }) {
  return (
    <div>
      <Button variant='contained' color='success' type={type}>
        {label}
      </Button>
    </div>
  );
}
export default ButtonComponent;
