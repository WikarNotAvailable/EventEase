import { Router } from "express";
import * as controller from "./eventImagesController";

const eventImagesRoutes: Router = Router();

eventImagesRoutes.post("/", controller.addEventImage);
eventImagesRoutes.get("/:event_id", controller.getEventImagesByEventId);
eventImagesRoutes.put("/:eventImage_id", controller.updateEventImage);
eventImagesRoutes.delete("/:eventImage_id", controller.deleteEventImage);

export default eventImagesRoutes;

/*
Response for GET /eventImages/:event_id
[
    {
        "eventImage_id": number,
        "url": string,
        "event_id": number
    },
    ...
]

Request body for POST /eventImages
{
    "url": string,
    "event_id": number
}

Request body for PUT /eventImages/:eventImage_id
{
    "url": string,
    "event_id": number
}
*/