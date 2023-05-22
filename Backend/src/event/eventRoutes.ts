import { Router } from "express";
import * as controller from "./eventController";

const eventRoutes: Router = Router();

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

export default eventRoutes;

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