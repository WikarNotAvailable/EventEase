import { Router } from "express";
import * as controller from "./eventTypeController";

const eventTypeRoutes: Router = Router();

eventTypeRoutes.post("/", controller.postEventType);

eventTypeRoutes.get("/", controller.getEventType);

eventTypeRoutes.get("/", controller.getEventTypeByID);

eventTypeRoutes.delete("/:id", controller.deleteEventType);

eventTypeRoutes.put("/:id", controller.updateEventType);

export default eventTypeRoutes;

/*
Reponse get
{
    "eventtype_id": int,
    "name": string
}
Body for Post
{
    "eventTypeName": string,
}

Body for Update //obligatory field below
{
    "eventTypeName": string,
}

*/