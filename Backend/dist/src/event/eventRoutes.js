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
const controller = __importStar(require("./eventController"));
const eventRoutes = (0, express_1.Router)();
eventRoutes.post("/", controller.addEvent);
eventRoutes.get("/", controller.getEvents);
eventRoutes.get("/:id", controller.getEventById);
eventRoutes.delete("/:id", controller.deleteEvent);
eventRoutes.put("/:id", controller.updateEvent);
eventRoutes.get("/spot/:spotId", controller.getEventsBySpotId);
eventRoutes.get("/eventtype/:eventTypeId", controller.getEventsByEventTypeId);
eventRoutes.get("/date-range", controller.getEventsWithinDateRange);
eventRoutes.get("/available-tickets", controller.getEventsWithAvailableTickets);
eventRoutes.get("/limited-availability/:limit", controller.getEventsWithLimitedAvailability);
eventRoutes.get("/sold-out", controller.getEventsWithSoldOutTickets);
exports.default = eventRoutes;
/*
Request Body for addEvent:
{
    "name": string,
    "description": string,
    "BeginDate": date,
    "EndDate": date,
    "AvailableTickets": integer,
    "CurrentlyTakenTickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}

Request Body for updateEvent:
{
    "name": string,
    "description": string,
    "BeginDate": date,
    "EndDate": date,
    "AvailableTickets": integer,
    "CurrentlyTakenTickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}
*/ 
