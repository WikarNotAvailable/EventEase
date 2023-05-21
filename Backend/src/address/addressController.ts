import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./addressQueries";

export const postAddress = async (req: any, res: any) => {
    try{
        const {country, city, street, number} = req.body;
        const newAddress: QueryResult<any> = await pool.query(queries.addAddress, [country, city, street, number]);
        
        res.json(newAddress.rows);
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getAddress = async (req: any,res: any) => {
    
}