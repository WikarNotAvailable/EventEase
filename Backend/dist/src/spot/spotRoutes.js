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
const controller = __importStar(require("./spotController"));
const spotRoutes = (0, express_1.Router)();
spotRoutes.post("/", controller.postSpot);
spotRoutes.get("/", controller.getSpot);
spotRoutes.get("/:id", controller.getSpotById);
spotRoutes.get('/type/:id', controller.getSpotByType);
spotRoutes.delete("/:id", controller.deleteSpot);
spotRoutes.put("/:id", controller.updateSpot);
exports.default = spotRoutes;
/*
Get All response:
{
    "spot_id": int,
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string,
    "capacity": int,
    "isopen": bool,
    "spotimage": string
}

Get by id response:
{
    "spot_id": int,
    "address": {
        "address_id": int,
        "country": string,
        "city": string,
        "street": string,
        "number": string
    },
    "spottype_id": int,
    "name": string,
    "description": string,
    "capacity": int,
    "isopen": bool,
    "spotimage": string,
    "type": string
}

Post body:
{
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string
    "capacity": int,
    "isOpen": bool,
    "spotimage": string
}

Update response:
{
    "spottype_id": int,
    "address_id": int,
    "name": string,
    "description": string
    "capacity": int,
    "isOpen": bool,
    "spotimage": string
}
*/ 
