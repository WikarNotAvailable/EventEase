import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./commentQueries";

export const postComment = async (req: any,res: any) => {
    try{
        
        const {content, post_date, user_id, discussion_id} = req.body;
        const userInDatabase: QueryResult<any> = await pool.query(queries.checkUserExists, [user_id]);
        const discussionInDatabase: QueryResult<any> = await pool.query(queries.checkDiscussionExists, [discussion_id]);

        if(userInDatabase.rows.length == 0){
            return res.status(400).json({message: "User does not exist."});
        }
        else if(discussionInDatabase.rows.length == 0){
            return res.status(400).json({message: "Discussion does not exist."});
        }
        else{
            const newComment: QueryResult<any> = await pool.query(queries.addComment, [content, post_date, user_id, discussion_id]);
            return res.status(201).json(newComment.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getComment = async (req: any, res: any) => {
    try{
        pool.query(queries.getComment, (error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getCommentById = async (req: any, res: any) => {
    try{
        const id = req.params.id;
        pool.query(queries.getCommentById, [id], (error, results) => {
            if(error) throw error;

            if(results.rows.length){
                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Comment does not exist."});
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getCommentByUser = async(req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const comment: QueryResult<any> = await pool.query(queries.getCommentByUser, [id]);
        return res.status(200).json(comment.rows);
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getCommentByDiscussion = async(req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const comment: QueryResult<any> = await pool.query(queries.getCommentByUser, [id]);
        return res.status(200).json(comment.rows);
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteComment = async(req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);

        const comment: QueryResult<any> = await pool.query(queries.getCommentById, [id]);

        if(!comment.rows.length){
            return res.status(400).json({message: "Comment does not exist."});
        }else{
            pool.query(queries.deleteComment, [id], (error, results) => {
                if(error) throw error;

                res.status(200).json({message: "Successfully deleted"});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateComment = async(req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const {content, post_date, user_id, discussion_id} = req.body;

        const comment: QueryResult<any> = await pool.query(queries.getCommentById, [id]);

        if(!comment.rows.length){
            return res.status(400).json({message: "Comment does not exist."});
        }
        else{
            const newComment: QueryResult<any> = await pool.query(queries.updateComment,[content, post_date, user_id, discussion_id, id]);
            return res.json(newComment.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}