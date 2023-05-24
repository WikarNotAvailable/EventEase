import express, { Express, Request, Response } from "express";
import userTypeRoutes from "./src/userType/userTypeRoutes";
import userRoutes from "./src/user/userRoutes";
import performerRoutes from "./src/performer/performerRoutes";
import spotTypeRoutes from "./src/spotType/spotTypeRoutes";
import transactionStatusRoutes from "./src/transactionStatus/transactionStatusRoutes";
import ticketTypeRoutes from "./src/ticketType/ticketTypeRoutes";
import eventsPerformersRoutes from "./src/eventsPerformers/eventsPerformersRoutes";
import companyRoutes from "./src/company/companyRoutes";
import eventTypeRoutes from "./src/eventType/eventTypeRoutes";
import performerTypeRoutes from "./src/performerType/performerTypeRoutes";
import transactionRoutes from "./src/transaction/transactionsRoutes";
import commentRoutes from "./src/comment/commentRoutes";
import ticketRoutes from "./src/ticket/ticketRoutes";
import eventRoutes from "./src/event/eventRoutes";
import addressRoutes from "./src/address/addressRoutes";
import spotRoutes from "./src/spot/spotRoutes";

const app: Express = express();

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/userTypes", userTypeRoutes);
app.use("/api/performers", performerRoutes);
app.use("/api/spotTypes", spotTypeRoutes);
app.use("/api/transactionStatuses", transactionStatusRoutes);
app.use("/api/ticketTypes", ticketTypeRoutes);
app.use("/api/eventsPerformers", eventsPerformersRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/eventTypes", eventTypeRoutes);
app.use("/api/performerTypes", performerTypeRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/spots", spotRoutes);

app.listen(8000, () =>{
  console.log("Server is listening on port 8000");
})