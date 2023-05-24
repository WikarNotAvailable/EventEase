"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./ticketController"));
const ticketRoutes = (0, express_1.Router)();
ticketRoutes.post("/", controller.postTicket);
ticketRoutes.post("/:number", controller.postNTickets);
ticketRoutes.get("/", controller.getTickets);
ticketRoutes.get("/forEvent", controller.getTicketsForEvent); //query params here, EventID and price
ticketRoutes.get("/:id", controller.getTicketById);
ticketRoutes.delete("/:id", controller.deleteTicket);
ticketRoutes.put("/:id", controller.updateUser);
exports.default = ticketRoutes;
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
