import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./userTypeQueries";

export const postUserType = async (req: any,res: any) => {
    try{
      const {userTypeName} : Record<string, any> = req.body;
      const newUserType : QueryResult<any> = await pool.query(queries.addUserType, [userTypeName]);
  
      res.json(newUserType.rows);
    }catch(err: any){
      res.status(500).json(err);
    }
}
export const getUserTypes = async (req: any,res: any) => {
    try{
      pool.query(queries.getUserTypes, (error, results) => {
          if (error) throw error;

          res.status(200).json(results.rows);
      })
    }catch(err: any){
      return res.status(400).json(err);
  }
}
export const getUserTypeById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getUserTypeById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows);
          }
          else{
              res.status(400).json({message: "UserType does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}
export const deleteUser = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const user: QueryResult<any> = await pool.query(queries.getUserTypeById, [id]);

      if(!user.rows.length){
          res.status(400).json({message: "User does not exist. (Non existent id)"})
      }
      else {
          pool.query(queries.deleteUserTypeById, [id], (error, results) => {
          if (error) throw error;

          res.status(200).json({message: "Successfully deleted."});
          })
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}