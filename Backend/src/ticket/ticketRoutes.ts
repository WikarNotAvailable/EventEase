import { Router } from "express";
import * as controller from "./ticketController";

const ticketRoutes : Router = Router();

ticketRoutes.post("/", controller.postTicket);

ticketRoutes.post("/:number", controller.postNTickets);

ticketRoutes.get("/f", controller.getTickets);

ticketRoutes.get("/forEvent", controller.getTicketsForEvent);

ticketRoutes.get("/:id", controller.getTicketById);

ticketRoutes.delete("/:id", controller.deleteTicket);

ticketRoutes.put("/:id", controller.updateUser);

export default ticketRoutes;