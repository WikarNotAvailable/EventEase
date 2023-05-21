import { Router } from "express";
import * as controller from "./transactionController";

const transactionRoutes : Router = Router();

transactionRoutes.post("/", controller.postTransaction);

transactionRoutes.get("/", controller.getTransactions);

transactionRoutes.get("/:id", controller.getTransactionById);

transactionRoutes.delete("/:id", controller.deleteTransaction);

transactionRoutes.put("/:id", controller.updateTransaction);

export default transactionRoutes;

/*
Get All response:
{
    "transaction_id": int,
    "user_id": int,
    "transactionstatus_id": int,
    "value": float,
    "transactiondate": date,
    "status": string
}

Get by id response:
{
    "transaction_id": int,
    "user_id": int,
    "transactionstatus_id": int,
    "value": float,
    "transactiondate": date,
    "status": string,
    "user": {
        "usertype": string,
        "name": string,
        "surname": string,
        "email": string,
        "phone_number": int,
        "birthday": date
    }
}

Post body:
{
    "userID": int,
    "transactionStatusID": int,
    "value": float,
    "transactionDate": string
}

Post and update response:
{
    "transaction_id": int,
    "user_id": int,
    "transactionstatus_id": int,
    "value": float,
    "transactiondate": string
}
*/