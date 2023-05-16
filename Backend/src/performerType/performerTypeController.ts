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