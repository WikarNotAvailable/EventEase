import express, { Express, Request, Response } from "express";
import userTypeRoutes from "./src/userType/userTypeRoutes";
import userRoutes from "./src/user/userRoutes";
import performerRoutes from "./src/performer/performerRoutes";
import spotTypeRoutes from "./src/spotType/spotTypeRoutes";
import transactionStatusRoutes from "./src/transactionStatus/transactionStatusRoutes";
import ticketTypeRoutes from "./src/ticketType/ticketTypeRoutes";
import performerTypeRoutes from "./src/performerType/performerTypeRoutes";
import transactionRoutes from "./src/transaction/transactionsRoutes";

const app: Express = express();

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/userTypes", userTypeRoutes);
app.use("/api/performers", performerRoutes);
app.use("/api/spotTypes", spotTypeRoutes);
app.use("/api/transactionStatuses", transactionStatusRoutes);
app.use("/api/ticketTypes", ticketTypeRoutes);
app.use("/api/performerTypes", performerTypeRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(8000, () =>{
  console.log("Server is listening on port 8000");
})