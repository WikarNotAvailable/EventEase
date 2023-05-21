import { Router } from "express";
import * as controller from "./spotTypeController";

const spotTypeRoutes : Router = Router();

spotTypeRoutes.post("/", controller.postSpotType);

spotTypeRoutes.get("/", controller.getSpotType);

spotTypeRoutes.get("/", controller.getSpotTypeById);

spotTypeRoutes.delete("/:id", controller.deleteSpotType);

spotTypeRoutes.put("/:id", controller.updateSpotType);

export default spotTypeRoutes;

/*
Body for Post


*/