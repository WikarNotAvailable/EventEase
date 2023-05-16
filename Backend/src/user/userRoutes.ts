import { Router } from "express";
import * as controller from "./userController";

const userRoutes : Router = Router();

userRoutes.post("/", controller.postUser);

userRoutes.get("/", controller.getUsers);

userRoutes.get("/:id", controller.getUserById);

userRoutes.delete("/:id", controller.deleteUser);

userRoutes.put("/:id", controller.updateUser);

userRoutes.post("/login", controller.loginUser);
export default userRoutes;

/*
Reponse get
{
    "user_id": int,
    "usertype_id": int,
    "name": string,
    "surname": string,
    "email": string,
    "phone_number": string,
    "birthday": date,
    "password": "password"
}

Body for Post
{
    "userTypeID": int,
    "name": string,
    "surname": string,
    "email": string,
    "phoneNumber": "string,
    "birthday": date, 
    "password": string
}

Body for Update //all fields optional 
{
    "name": string,
    "surname": string,
    "email": string,
    "phoneNumber": "string,
    "birthday": date, 
    "password": string
}

Body for Login
{
    "email": string,
    "password": string
}
*/