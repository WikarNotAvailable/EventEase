import express, { Express, Request, Response } from "express";
import userTypeRoutes from "./src/userType/userTypeRoutes";
import userRoutes from "./src/user/userRoutes";
import spotTypeRoutes from "./src/spotType/spotTypeRoutes";

const app: Express = express();

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/userTypes", userTypeRoutes);
app.use("/api/spotTypes", spotTypeRoutes);

app.listen(8000, () =>{
  console.log("Server is listening on port 5000");
})