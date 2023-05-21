import { Router } from "express";
import * as controller from "./ticketTypeController";

const ticketTypeRoutes : Router = Router();

ticketTypeRoutes.post("/", controller.postTicketType);

ticketTypeRoutes.get("/", controller.getTicketTypes);

ticketTypeRoutes.get("/:id", controller.getTicketTypeById);

ticketTypeRoutes.delete("/:id", controller.deleteTicketType);

ticketTypeRoutes.put("/:id", controller.updateTicketType);

/*
    Post body:
 {
    "type": string
 }
    Get response:
 {
        "tickettype_id": int,
        "type": string
 }

*/

export default ticketTypeRoutes;