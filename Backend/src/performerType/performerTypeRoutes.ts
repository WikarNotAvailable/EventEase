import { Router } from "express";
import * as controller from "./performerTypeController";

const performerTypeRoutes : Router = Router();

performerTypeRoutes.post("/", controller.postPerformerType);
performerTypeRoutes.get("/", controller.getPerformerTypes);
performerTypeRoutes.get("/:id", controller.getPerformerTypeById);

export default performerTypeRoutes;

/*
Body for Post
{
    "performerTypeName": string,
}
*/
