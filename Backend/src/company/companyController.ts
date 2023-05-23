import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./companyQueries";

export const postCompany = async (req: any,res: any) => {
    try{
        const {discussionID, name, description} = req.body;
        const newCompany: QueryResult<any> = await pool.query(queries.addCompany,[discussionID, name, description]);
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getCompany = async (req: any,res: any) => {
    try{
        pool.query(queries.getCompany,(error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getCompanyById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getCompanyById, [id], (error, results) => {
            if(error) throw error;

            if(results.rows.length){
                res.status(200).json(results.rows);
            }
            else{
                res.status(400).json({message: "Company does not exist. Non existent id."})
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteCompany = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const company: QueryResult<any> = await pool.query(queries.getCompanyById, [id]);

        if(!company.rows.length){
            res.status(400).json({message: "Company does not exist. (Non existent id)"})
        }
        else{
            pool.query(queries.deleteCompany, [id], (error, results) => {
                if(error) throw error;

                res.status(200).json({message: "Successfully deleted"});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateCompany = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {name, description} = req.body;
        const company: QueryResult<any> = await pool.query(queries.getCompanyById, [id]);

        if(name == null)
            name = company.rows[0]["name"];
        if(description == null)
            description = company.rows[0]["description"];
        
        if(!company.rows.length){
            res.status(400).json({message: "Company does not exist. (Non existent id)"})
        }
        else{
            const newCompany: QueryResult<any> = await pool.query(queries.updateCompany, [name, description, id]);
            res.json(newCompany.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}