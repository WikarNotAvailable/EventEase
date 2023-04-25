"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./userController"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", controller.postUser);
userRoutes.get("/", controller.getUsers);
userRoutes.get("/:id", controller.getUserById);
userRoutes.delete("/:id", controller.deleteUser);
userRoutes.put("/:id", controller.updateUser);
exports.default = userRoutes;
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
