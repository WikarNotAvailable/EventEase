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
const controller = __importStar(require("./commentController"));
const commentRoutes = (0, express_1.Router)();
commentRoutes.post("/", controller.postComment);
commentRoutes.get("/", controller.getComment);
commentRoutes.get("/:id", controller.getCommentById);
commentRoutes.get("/user/:id", controller.getCommentByUser);
commentRoutes.get("/discussion/:id", controller.getCommentByDiscussion);
commentRoutes.delete("/:id", controller.deleteComment);
commentRoutes.put("/:id", controller.updateComment);
exports.default = commentRoutes;
/*
Get All response:
{
    "comments_id": int,
    "content": string,
    "post_date": string,
    "user_id": int,
    "discussion_id": int
}

Get by id response:
{
    "comments_id": int,
    "content": string,
    "post_date": Date,
    "user": {
        "user_id": int,
        "name": string,
        "Palus": string
    },
    "discussion": {
        "discussion_id": int,
        "discussionname": string
    }
}

Post body:
{
    "content": string,
    "post_date": Date,
    "user_id": int,
    "discussion_id": int
}

Update response:
{
    "content": string,
    "post_date": Date,
    "user_id": int,
    "discussion_id": int
}
*/ 
