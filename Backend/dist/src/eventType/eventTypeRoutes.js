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
const controller = __importStar(require("./eventTypeController"));
const eventTypeRoutes = (0, express_1.Router)();
eventTypeRoutes.post("/", controller.postEventType);
eventTypeRoutes.get("/", controller.getEventType);
eventTypeRoutes.get("/", controller.getEventTypeByID);
eventTypeRoutes.delete("/:id", controller.deleteEventType);
eventTypeRoutes.put("/:id", controller.updateEventType);
exports.default = eventTypeRoutes;
/*
Reponse get
{
    "eventtype_id": int,
    "name": string
}
Body for Post
{
    "eventTypeName": string,
}

Body for Update //obligatory field below
{
    "eventTypeName": string,
}

*/ 