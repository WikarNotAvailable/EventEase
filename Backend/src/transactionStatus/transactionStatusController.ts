import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./transactionStatusQueries";

export const postTransactionStatus= async (req: any,res: any) => {
    try{
      const {status} : Record<string, any> = req.body;
      const newTransactionStatus : QueryResult<any> = await pool.query(queries.addTransactionStatus, [status]);
  
      res.json(newTransactionStatus.rows[0]);
    }catch(err: any){
      res.status(500).json(err);
    }
}

export const getTransactionStatuses = async (req: any,res: any) => {
  try{
    pool.query(queries.getTransactionStatuses, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    })
  }catch(err: any){
    return res.status(400).json(err);
}
}

export const getTransactionStatusById = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);

      pool.query(queries.getTransactionStatusById, [id], (error, results) => {
          if (error) throw error;

          if (results.rows.length){
              res.status(200).json(results.rows[0]);
          }
          else{
              res.status(400).json({message: "Transaction status does not exist. (Non existent id)"})
          }  
      })
  }catch(err: any){
      return res.status(400).json(err);
  }
}

export const deleteTransactionStatus = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const transactionStatus: QueryResult<any> = await pool.query(queries.getTransactionStatusById, [id]);

      if(!transactionStatus.rows.length){
          res.status(400).json({message: "Transaction status does not exist. (Non existent id)"})
      }
      else {
          pool.query(queries.deleteTransactionStatus, [id], (error, results) => {
          if (error) throw error;

          res.status(200).json({message: "Successfully deleted."});
          })
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}

export const updateTransactionStatus = async (req: any,res: any) => {
  try{
      const id = parseInt(req.params.id);
      const {status} = req.body;
      const transactionStatus: QueryResult<any> = await pool.query(queries.getTransactionStatusById, [id]);
      
      if(!transactionStatus.rows.length){
          res.status(400).json({message: "TransactionStatus does not exist. (Non existent id)"})
      }
      else {
          const newTransactionStatus: QueryResult<any>  = await pool.query(queries.updateTransactionStatus, [status, id]);
          res.status(200).json(newTransactionStatus.rows[0]);
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}