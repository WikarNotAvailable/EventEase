import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./eventTypeQueries";

export const postEventType = async (req: any,res: any) => {
    try{
        const {eventTypeName} : Record<string, any> = req.body;
        const newEventType : QueryResult<any> = await pool.query(queries.addEventType, [eventTypeName]);

        res.json(newEventType.rows);
    }catch(err: any){
        res.status(500).json(err);
    }
}

export const getEventType = async (req: any,res: any) => {
    try{
        pool.query(queries.getEventType, (error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getEventTypeByID = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getEventTypeById, [id], (error, results) => {
            if(error) throw error;

            if(results.rows.length){
                res.status(200).json(results.rows);
            }
            else{
                res.status(400).json({message: "Event Type does not exist. (Non existent id)"})
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteEventType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const eventType: QueryResult<any> = await pool.query(queries.getEventTypeById, [id]);

        if(!eventType.rows.length){
            res.status(400).json({message: "Event Type does not exist. (Non existent id)"})
        }
        else{
            pool.query(queries.deleteEventType, [id], (error, results) => {
                if(error) throw error;
                res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err:any){
        return res.status(400).json(err);
    }
}

export const updateEventType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const {eventTypeName} = req.body;
        const eventType: QueryResult<any> = await pool.query(queries.getEventTypeById, [id]);

        if(!eventType.rows.length){
            res.status(400).json({message: "Event type does not exist. (Non existent id"})
        }
        else{
            const newEventType: QueryResult<any> = await pool.query(queries.updateEventType, [eventTypeName, id]);
            res.json(newEventType.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}