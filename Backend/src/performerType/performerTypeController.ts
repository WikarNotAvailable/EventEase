import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./performerTypeQueries";

export const postPerformerType = async (req: any,res: any) => {
    try{
      const {performerTypeName} : Record<string, any> = req.body;
      const performerTypeInDatabse: QueryResult<any> = await pool.query(queries.checkPerformerTypeExists, [performerTypeName]);

      if(performerTypeInDatabse.rows.length) {
        return res.status(400).json({message: "type arleady exists"});
      }
      
      const newPerformerType : QueryResult<any> = await pool.query(queries.addPerformerType, [performerTypeName]);
  
      res.json(newPerformerType.rows[0]);
    }catch(err: any){
      res.status(500).json(err);
    }
}

export const getPerformerTypes = async (req: any,res: any) => {
  try{
      pool.query(queries.getPerformerTypes, (error, results) => {
          if (error) throw error;

          res.status(200).json(results.rows);
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}

export const getPerformerTypeById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getPerformerTypeById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows[0]);
          }
          else{
              res.status(400).json({message: "Performer Type does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}

export const deletePerformerType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const performerType: QueryResult<any> = await pool.query(queries.getPerformerTypeById, [id]);

        if(!performerType.rows.length){
            res.status(400).json({message: "Performer Type does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deletePerformerType, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updatePerformerType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const {performerTypeName} = req.body;
        const user: QueryResult<any> = await pool.query(queries.getPerformerTypeById, [id]);
        
        if(!user.rows.length){
            res.status(400).json({message: "Performer Type does not exist. (Non existent id)"})
        }
        else {
            const performerTypeInDatabse: QueryResult<any> = await pool.query(queries.checkPerformerTypeExists, [performerTypeName]);
            if (performerTypeInDatabse.rows.length) {
                res.status(400).json({message: "type arleady exists"});
            }
            else {
                const newPerformerType: QueryResult<any>  = await pool.query(queries.updatePerformerType, [performerTypeName, id]);
                res.json(newPerformerType.rows[0]);
            }
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
  }