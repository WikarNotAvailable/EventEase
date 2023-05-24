import { Router } from "express";
import * as controller from "./companyController";

const companyRoutes : Router = Router();

companyRoutes.post("/", controller.postCompany);

companyRoutes.get("/", controller.getCompany);

companyRoutes.get("/:id", controller.getCompanyById);

companyRoutes.get("/discussion/:id", controller.getCompanyByDiscussion);

companyRoutes.delete("/:id", controller.deleteCompany);

companyRoutes.put("/:id", controller.updateCompany);

export default companyRoutes;

/*
Get All response:
{
    "company_id": int,
    "name": string,
    "description": string,
    "discussion_id": int
}

Get by id response:
{
    "company_id": int,
    "name": string,
    "description": string,
    "discussion": {
        "discussion_id": int,
        "name": string,
        "description": string
    }
}

Post body:
{
    "name": string,
    "description": string,
    "discussion_id": int
}

Update response:
{
    "name": string,
    "description": string,
    "discussion_id": int
}
*/