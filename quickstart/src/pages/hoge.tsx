import { Button } from "@mui/material";

export default function Hoge() {
  const onClick = () => {
    alert("hogehoge");
  };

  return (
    <>
      <Button onClick={onClick} variant="text">
        Text
      </Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  );
}
