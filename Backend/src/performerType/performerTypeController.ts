import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./performerTypeQueries";

export const postPerformerType = async (req: any,res: any) => {
    try{
      const {performerTypeName} : Record<string, any> = req.body;
      const newPerformerType : QueryResult<any> = await pool.query(queries.addPerformerType, [performerTypeName]);
  
      res.json(newPerformerType.rows);
    }catch(err: any){
      res.status(500).json(err);
    }
}

export const getPerformerTypeById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getPerformerTypeById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows);
          }
          else{
              res.status(400).json({message: "Performer Type does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}