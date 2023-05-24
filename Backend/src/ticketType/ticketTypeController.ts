import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./ticketTypeQueries";

export const postTicketType = async (req: any,res: any) => {
    try{
      const {type} : Record<string, any> = req.body;
      const newTicketType : QueryResult<any> = await pool.query(queries.addTicketType, [type]);
  
      res.json(newTicketType.rows[0]);
    }catch(err: any){
      res.status(500).json(err);
    }
}

export const getTicketTypes = async (req: any,res: any) => {
    try{
      pool.query(queries.getTicketTypes, (error, results) => {
          if (error) throw error;

          res.status(200).json(results.rows);
      })
    }catch(err: any){
      return res.status(400).json(err);
  }
}

export const getTicketTypeById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
  
        pool.query(queries.getTicketTypeById, [id], (error, results) => {
            if (error) throw error;
  
            if (results.rows.length){
                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Ticket type does not exist. (Non existent id)"})
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteTicketType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const ticketType: QueryResult<any> = await pool.query(queries.getTicketTypeById, [id]);
  
        if(!ticketType.rows.length){
            res.status(400).json({message: "Ticket type does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deleteTicketTypeById, [id], (error, results) => {
            if (error) throw error;
  
            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateTicketType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const {type} = req.body;
        const ticketType: QueryResult<any> = await pool.query(queries.getTicketTypeById, [id]);
        
        if(!ticketType.rows.length){
            res.status(400).json({message: "Ticket type does not exist. (Non existent id)"})
        }
        else {
            const newTicketType: QueryResult<any>  = await pool.query(queries.updateTicketType, [type, id]);
            res.status(200).json(newTicketType.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
  }