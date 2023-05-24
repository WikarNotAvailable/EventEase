import { Router } from "express";
import * as controller from "./commentController";

const commentRoutes: Router = Router();

commentRoutes.post("/", controller.postComment);

commentRoutes.get("/", controller.getComment);

commentRoutes.get("/:id", controller.getCommentById);

commentRoutes.get("/user/:id", controller.getCommentByUser);

commentRoutes.get("/discussion/:id", controller.getCommentByDiscussion);

commentRoutes.delete("/:id", controller.deleteComment);

commentRoutes.put("/:id", controller.updateComment);

export default commentRoutes;

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