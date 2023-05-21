import { Router } from "express";
import * as controller from "./userTypeController";

const userTypeRoutes : Router = Router();

userTypeRoutes.post("/", controller.postUserType);

userTypeRoutes.get("/", controller.getUserTypes);

userTypeRoutes.get("/:id", controller.getUserTypeById);

userTypeRoutes.delete("/:id", controller.deleteUser);

userTypeRoutes.put("/:id", controller.updateUserType);

export default userTypeRoutes;

/*
Reponse get
{
    "usertype_id": int,
    "name": string
}
Body for Post
{
    "userTypeName": string,
}

Body for Update //obligatory field below
{
    "userTypeName": string,
}

*/

