import Button from "@mui/material/Button";
function ButtonComponent({ type, label, color }) {
  return (
    <div>
      <Button variant='contained' color={color} type={type} size='small'>
        {label}
      </Button>
    </div>
  );
}
export default ButtonComponent;
