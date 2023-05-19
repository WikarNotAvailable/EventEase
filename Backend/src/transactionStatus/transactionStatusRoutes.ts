import { Router } from "express";
import * as controller from "./transactionStatusController";

const transactionStatusRoutes : Router = Router();

transactionStatusRoutes.post("/", controller.postTransactionStatus);

transactionStatusRoutes.get("/", controller.getTransactionStatuses);

transactionStatusRoutes.get("/:id", controller.getTransactionStatusById);

transactionStatusRoutes.delete("/:id", controller.deleteTransactionStatus);

transactionStatusRoutes.put("/:id", controller.updateTransactionStatus);

export default transactionStatusRoutes;

/*
Body for post:
 {
    "status": string
 }

 Response for get:
 {
   "transactionstatus_id": int
   "status": string
 }

 }
*/