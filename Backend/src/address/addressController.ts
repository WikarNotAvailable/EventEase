import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./addressQueries";

export const postAddress = async (req: any, res: any) => {
    try{
        const {country, city, street, number} = req.body;
        const newAddress: QueryResult<any> = await pool.query(queries.addAddress, [country, city, street, number]);
        
        res.json(newAddress.rows);
    }catch(err: any){
        return res.status(500).json(err);
    }
}

export const getAddress = async (req: any,res: any) => {
    try{
        pool.query(queries.getAddress,(error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err:any){
        return res.status(400).json(err);
    }
}

export const getAddressById = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getAddressById, [id], (error, result) => {
            if(error) throw error;

            if(result.rows.length){
                res.status(200).json(result.rows);
            }
            else{
                res.status(400).json({message: "Address does not exist."})
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteAddress = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const address: QueryResult<any> = await pool.query(queries.getAddressById, [id]);
        
        if(!address.rows.length){
            res.status(400).json({message: "Address does not exist."})    
        }
        else{
            pool.query(queries.deleteAddress, [id], (error, results) => {
                if(error) throw error;

                res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateAddress = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {country, city, street, number} = req.body;
        const address: QueryResult<any> = await pool.query(queries.getAddressById, [id]);

        if(country == null)
            country = address.rows[0]["country"];
        if(city == null)
            city = address.rows[0]["city"];
        if(street == null)
            street = address.rows[0]["street"];
        if(number == null)
            number =address.rows[0]["number"];
        
        if(!address.rows.length){
            res.status(400).json({message: "Address does not exist."})
        }
        else{
            const newAddress: QueryResult<any> = await pool.query(queries.updateAddress, [country, city, street, number, id]);
            res.json(newAddress.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}
