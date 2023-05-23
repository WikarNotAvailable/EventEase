import { Router } from "express";
import * as controller from "./ticketController";

const ticketRoutes : Router = Router();

ticketRoutes.post("/", controller.postTicket);

ticketRoutes.post("/:number", controller.postNTickets);

ticketRoutes.get("/", controller.getTickets);

ticketRoutes.get("/forEvent", controller.getTicketsForEvent); //query params here, EventID and price

ticketRoutes.get("/:id", controller.getTicketById);

ticketRoutes.delete("/:id", controller.deleteTicket);

ticketRoutes.put("/:id", controller.updateUser);

export default ticketRoutes;

/*
Get all reponse:
{
    "ticket_id": int,
    "tickettype_id": int,
    "event_id": int,
    "transaction_id": null,
    "price": float,
    "ticket_place": int,
    "isavailable": boolean,
    "type": string
}

Get by id response:
{
    "ticket_id": int,
    "tickettype_id": int,
    "event_id": int,
    "transaction_id": int,
    "price": float,
    "ticket_place": int,
    "isavailable": boolean,
    "type": string,
    "transaction": [],
    "event": []
}

Post body: (when n tickets use /:number route, you cannot post with transaction, it has to be added via update)
{
    "ticketTypeID": int,
    "eventID": int,
    "price": int,
    "withPlaces": boolean
}

Response for singular ticket:
 {
    "ticket_id": int,
    "tickettype_id": int,
    "event_id": int,
    "transaction_id": int,
    "price": int,
    "ticket_place": int,
    "isavailable": boolean
}
For multiple:
{
    "meesage": "Tickets were added successfuly."
}

Update body:
{
    "price": int,
    "isAvailable": boolean,
    "transactionID": int
}
*/