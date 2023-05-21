import { Router } from "express";
import * as controller from "./companyController";

const companyRoutes : Router = Router();

companyRoutes.post("/", controller.postCompany);

companyRoutes.get("/", controller.getCompany);

companyRoutes.get("/:id", controller.getCompanyById);

companyRoutes.delete("/:id", controller.deleteCompany);

companyRoutes.put("/:id", controller.updateCompany);

export default companyRoutes;

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