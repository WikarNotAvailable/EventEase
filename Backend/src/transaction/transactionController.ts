import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./transactionQueries";

export const postTransaction = async (req: any, res: any) => {
    try{ 
        const {userID, transactionStatusID, value, transactionDate} = req.body;
        
        const userInDatabase: QueryResult<any> = await pool.query(queries.checkUserExists, [userID]); 

        const transactionStatusInDatabase: QueryResult<any> = await pool.query(queries.checkTransactionStatusExists, [transactionStatusID]);

        if (userInDatabase.rows.length == 0){
            return res.status(400).json({message: "User does not exist."});
        }
        else if (transactionStatusInDatabase.rows.length == 0){
            return res.status(400).json({message: "Transaction status does not exist."});
        }
        else {
            const newTransaction: QueryResult<any> = await pool.query(queries.addTransaction, [userID, transactionStatusID, value, transactionDate]);
            return res.status(201).json(newTransaction.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTransactions = async (req: any,res: any) => {
    try{
        pool.query(queries.getTransactions, (error, results) => {
            if (error) throw error;
            
            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTransactionById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getTransactionById, [id], async (error, results) => {
            if (error) throw error;

            if (results.rows.length){
                results.rows[0]["user"] = (await pool.query(queries.getUserForTransaction, [results.rows[0]["user_id"]])).rows[0];
                results.rows[0]["tickets"] = (await pool.query(queries.getTicketsForTransaction, [results.rows[0]["transaction_id"]])).rows;

                res.status(200).json(results.rows);
            }
            else{
                res.status(400).json({message: "Transaction does not exist. (Non existent id)"})
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteTransaction = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const transaction: QueryResult<any> = await pool.query(queries.getTransactionById, [id]);

        if(!transaction.rows.length){
            res.status(400).json({message: "Transaction does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deleteTransaction, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateTransaction = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {transactionStatusID, value, transactionDate} = req.body;
        const transaction: QueryResult<any> = await pool.query(queries.getTransactionById, [id]);

        if(transactionStatusID == null)
            transactionStatusID = transaction.rows[0]["transactionstatus_id"];
        if(value == null)
            value = transaction.rows[0]["value"];
        if(transactionDate == null)
            transactionDate = transaction.rows[0]["transactiondate"]
    
        if(!transaction.rows.length){
            res.status(400).json({message: "Transaction does not exist. (Non existent id)"})
        }
        else {
            const newTransaction: QueryResult<any>  = await pool.query(queries.updateTransaction, [transactionStatusID, value, transactionDate, id]);
            res.json(newTransaction.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}