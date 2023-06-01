import { Router } from "express";
import * as controller from "./eventImagesController";

const eventImagesRoutes: Router = Router();

eventImagesRoutes.post("/", controller.addEventImage);
eventImagesRoutes.get("/", controller.getEventImages);
eventImagesRoutes.get("/:id", controller.getEventImageById);
eventImagesRoutes.get("/event/:id", controller.getEventImagesByEventId);
eventImagesRoutes.put("/:eventimage_id", controller.updateEventImage);
eventImagesRoutes.delete("/:id", controller.deleteEventImage);

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