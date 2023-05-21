import express, { Express, Request, Response } from "express";
import userTypeRoutes from "./src/userType/userTypeRoutes";
import userRoutes from "./src/user/userRoutes";
import spotTypeRoutes from "./src/spotType/spotTypeRoutes";
import transactionStatusRoutes from "./src/transactionStatus/transactionStatusRoutes";
import ticketTypeRoutes from "./src/ticketType/ticketTypeRoutes";
import eventTypeRoutes from "./src/eventType/eventTypeRoutes";

const app: Express = express();

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/userTypes", userTypeRoutes);
app.use("/api/spotTypes", spotTypeRoutes);
app.use("/api/transactionStatuses", transactionStatusRoutes);
app.use("/api/ticketTypes", ticketTypeRoutes);
app.use("/api/eventTypes", eventTypeRoutes);

app.listen(8000, () =>{
  console.log("Server is listening on port 8000");
})