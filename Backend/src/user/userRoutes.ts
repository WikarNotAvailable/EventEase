import { Router } from "express";
import * as controller from "./userController";

const userRoutes : Router = Router();

userRoutes.post("/", controller.postUser);

userRoutes.get("/", controller.getUsers);

userRoutes.get("/:id", controller.getUserById);

userRoutes.delete("/:id", controller.deleteUser);

userRoutes.put("/:id", controller.updateUser);

export default userRoutes;

/*
Body for Post

{
    "userTypeID": int,
    "name": string,
    "surname": string,
    "email": string,
    "phoneNumber": "string,
    "birthday": string, 
    "password": string
}


Body for Update

{
    "name": string,
    "surname": string,
    "email": string,
    "phoneNumber": "string,
    "birthday": string, 
    "password": string
}

*/