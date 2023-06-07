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
const controller = __importStar(require("./performerController"));
const performerRoutes = (0, express_1.Router)();
performerRoutes.post('/', controller.addPerformer);
performerRoutes.get('/', controller.getPerformers);
performerRoutes.get('/:id', controller.getPerformerById);
performerRoutes.get('/type/:id/:limit?', controller.getPerformersByType);
performerRoutes.get('/name/:name', controller.getPerformerByName);
performerRoutes.get('/event/:id', controller.getPerformersByEventId);
performerRoutes.delete('/:id', controller.deletePerformer);
performerRoutes.put('/:id', controller.updatePerformer);
exports.default = performerRoutes;
/*
Body for Post

{
    "performertype_id": number,
    "name": string,
    "description": string
}

Body for Update

{
    "performertype_id": number,
    "name": string,
    "description": string
}
*/
