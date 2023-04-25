import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./userTypeQueries";

export const postUserType = async (req: any,res: any) => {
    try{
      const {userTypeName} : Record<string, any> = req.body;
      const newUserType : QueryResult<any> = await pool.query(queries.addUserType, [userTypeName]);
  
      res.json(newUserType);
    }catch(err: any){
      res.status(500).json(err);
    }
}