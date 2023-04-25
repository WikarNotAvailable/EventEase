import { Router } from "express";
import * as controller from "./userTypeController";

const userTypeRoutes : Router = Router();

userTypeRoutes.post("/", controller.postUserType);

export default userTypeRoutes;

/*
Body for Post

{
    "userTypeName": string,
}

*/

