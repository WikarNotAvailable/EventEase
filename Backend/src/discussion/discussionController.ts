import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./discussionQueries";

export const getDiscussion = async (req:any,res: any) => {
    try{
        pool.query(queries.getDiscussion, (error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getDiscussionById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getDiscussionById, [id], (error, results) => {
            if (error) throw error;

            if(results.rows.length){
                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Discussion does not exist. (Non existent id)"})
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}