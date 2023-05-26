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
Reponse get all
{
    "user_id": int,
    "usertype_id": int,
    "usertype": string,
    "name": string,
    "surname": string,
    "email": string,
    "phone_number": string,
    "birthday": date
}
Response get
{
    "user_id": int,
    "usertype_id": int,
    "usertype": string,
    "name": string,
    "surname": string,
    "email": string,
    "phone_number": int,
    "birthday": date,
    "password": string (hashed),
    "transactions": [
        {
            "transaction_id": int,
            "user_id": int,
            "transactionstatus_id": int,
            "value": float,
            "transactiondate": date,
            "status": "Completed"
        }
    ]
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