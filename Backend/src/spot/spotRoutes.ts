import { Router } from "express";
import * as controller from "./spotController";

const spotRoutes : Router = Router();

spotRoutes.post("/", controller.postSpot);

spotRoutes.get("/", controller.getSpot);

spotRoutes.get("/:id", controller.getSpotById);

spotRoutes.delete("/:id", controller.deleteSpot);

spotRoutes.put("/:id", controller.updateSpot);

export default spotRoutes;

/*
Get All response:
{
    "spot_id": int,
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string,
    "capacity": int,
    "isopen": bool,
    "spotimage": string
}

Get by id response:
{
    "spot_id": int,
    "address": {
        "address_id": int,
        "country": string,
        "city": string,
        "street": string,
        "number": string
    },
    "spottype_id": int,
    "name": string,
    "description": string,
    "capacity": int,
    "isopen": bool,
    "spotimage": string,
    "type": string
}

Post body:
{
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string
    "capacity": int,
    "isOpen": bool,
    "spotimage": string
}

Update response:
{
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string
    "capacity": int,
    "isOpen": bool,
    "spotimage": string
}
*/