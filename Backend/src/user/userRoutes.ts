import { Router } from "express";
import * as controller from "./userController";
const userRoutes : Router = Router();

userRoutes.post("/", controller.postUser);

userRoutes.get("/", controller.getUsers);

userRoutes.get("/:id", controller.getUserById);

userRoutes.delete("/:id", controller.deleteUser);

userRoutes.put("/:id", controller.updateUser);

export default userRoutes;