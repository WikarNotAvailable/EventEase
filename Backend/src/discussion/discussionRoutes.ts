import { Router } from "express";
import * as controller from "./discussionController";

const discussionRoutes : Router = Router();

discussionRoutes.get("/", controller.getDiscussion);

discussionRoutes.get("/:id", controller.getDiscussionById);

export default discussionRoutes;

/*
Get All response:
{
    "discussion_id": int,
    "company_id": int,
    "event_id": int
}

Get by id response:
{
    "discussion_id": int,
    "company_id": int,
    "event_id": int,
    "comment": [
        {
            "comment_id": int,
            "content": string,
            "post_date": Date,
            "user_id": int
        }
    ]
}
*/