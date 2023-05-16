import { Router } from "express";
import * as controller from "./performerTypeController";

const performerTypeRoutes : Router = Router();

performerTypeRoutes.post("/", controller.postPerformerType);

export default performerTypeRoutes;

/*
Body for Post

{
    "performerTypeName": string,
}

*/
