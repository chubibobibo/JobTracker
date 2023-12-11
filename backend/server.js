import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//sample route
app.get("/", (req, res) => {
  console.log("server is working");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
