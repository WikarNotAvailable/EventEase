import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./spotTypeQueries";

export const postSpotType = async (req: any,res: any) => {
    try{
        const {spotTypeName} : Record<string, any> = req.body;
        const spotTypeNameExist: QueryResult<any> = await pool.query(queries.checkSpotTypeNameExist, [spotTypeName]);
        if(spotTypeNameExist.rows.length){
            return res.status(400).json({message: "Spot type name already exist"});
        }else{
            const newSpotType : QueryResult<any> = await pool.query(queries.addSpotType, [spotTypeName]);
            res.json(newSpotType.rows[0]);
        }
    }catch(err: any){
        res.status(500).json(err);
        console.log(err);
    }
}

export const getSpotType = async (req: any, res: any) => {
    try{
        pool.query(queries.getSpotType, (error, results) => {
            if(error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err:any){
        return res.status(400).json(err);
    }
}

export const getSpotTypeById = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
            
        pool.query(queries.getSpotTypeById, [id], (error, result) => {
            if(error) throw error;

            if(result.rows.length){
                res.status(200).json(result.rows[0]);
            }
            else{
                res.status(400).json({message: "Spot Type does not exist. (Non existent id)"})
            }
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteSpotType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const spotType: QueryResult<any> = await pool.query(queries.getSpotTypeById, [id]);

        if(!spotType.rows.length){
            res.status(400).json({message: "Spot type does not exist. (Non existent id)"})
        }
        else {
            pool.query(queries.deleteSpotType, [id], (error, result) => {
            if(error) throw error;
            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateSpotType = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const {spotTypeName} = req.body;
        const spotTypeNameExist: QueryResult<any> = await pool.query(queries.checkSpotTypeNameExist, [spotTypeName]);
        const spotType: QueryResult<any> = await pool.query(queries.getSpotTypeById, [id]);

        if(!spotType.rows.length){
            res.status(400).json({message: " Spot type does not exist. (Non existent id)"})
        }
        else if(spotTypeNameExist.rows.length){
            return res.status(400).json({message: "Spot type name already exist"});
        }
        else{
            const newSpotType: QueryResult<any> = await pool.query(queries.updateSpotType, [spotTypeName, id]);
            res.json(newSpotType.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}
