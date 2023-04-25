import express, { Express, Request, Response } from "express";
import userTypeRoutes from "./src/userType/userTypeRoutes";
import userRoutes from "./src/user/userRoutes";

const app: Express = express();

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/userTypes", userTypeRoutes);

app.listen(5000, () =>{
  console.log("Server is listening on port 5000");
})