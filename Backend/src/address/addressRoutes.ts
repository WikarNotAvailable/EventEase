import { Router } from "express";
import * as controller from "./addressController";

const addressRoutes : Router = Router();

addressRoutes.post("/", controller.postAddress);

addressRoutes.get("/", controller.getAddress);

addressRoutes.get("/:id", controller.getAddressById);

addressRoutes.delete("/:id", controller.deleteAddress);

addressRoutes.put("/:id", controller.updateAddress);

export default addressRoutes;

/*
Get response:
{
    "address_id": int
    "country": string,
    "city": string,
    "street": string,
    "number": string
}


Post body:
{
    "country": string,
    "city": string,
    "street": string,
    "number": string
}

Update response:
{
    "country": string,
    "city": string,
    "street": string,
    "number": string
}
*/
