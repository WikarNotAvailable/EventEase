import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./spotQueries";

export const postSpot = async (req: any, res: any) => {
    try{
        const {spottype_id, address_id, name, description, capacity, isopen, spotimage} = req.body;

        const addressInDatabase: QueryResult<any> = await pool.query(queries.checkAddressExist, [address_id]);

        const typeInDatabase: QueryResult<any> = await pool.query(queries.checkSpotTypeExist, [spottype_id]);

        const spotNameExist: QueryResult<any> = await pool.query(queries.checkSpotNameExist, [name]);

        if(addressInDatabase.rows.length == 0){
            return res.status(400).json({message: "Address does not exist."});
        }
        else if(typeInDatabase.rows.length == 0){
            return res.status(400).json({message: "Spot type does not exist."});
        }
        else if(spotNameExist.rows.length){
            return res.status(400).json({message: "Spot name already exist"});
        }
        else {
            const newSpot: QueryResult<any> = await pool.query(queries.addSpot, [spottype_id, address_id, name, description, capacity, isopen, spotimage]);
            return res.status(201).json(newSpot.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getSpot = async(req: any, res: any) => {
    try{
        pool.query(queries.getSpot, (error, results) => {
            if(error) throw error;

            res.status(201).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getSpotById = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getSpotById, [id], async (error, results) => {
            if(error) throw error;

            if(results.rows.length){
               res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Spot does not exist"})
            }
        }) 
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getSpotByType = async (req: any, res: any) => {
    try{
        const spottype_id = parseInt(req.params.id);
        const spot: QueryResult<any> = await pool.query(queries.getSpotByType, [spottype_id]);
        return res.status(200).json(spot.rows);
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteSpot = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const spot: QueryResult<any> = await pool.query(queries.getSpotById, [id]);

        if(!spot.rows.length){
            res.status(400).json({message: "Spot does not exist."})
        }
        else{
            pool.query(queries.deleteSpot, [id], (error, results) => {
                if(error) throw error;

                res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateSpot = async (req: any, res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {spottype_id, address_id, name, description, capacity, isopen, spotimage} = req.body;

        const spot: QueryResult<any> = await pool.query(queries.getSpotById, [id]);

        if(!spot.rows.length){
            return res.status(400).json({message: "Spot does not exist"});
        }
        else{
            const newSpot: QueryResult<any> = await pool.query(queries.updateSpot, [spottype_id, address_id, name, description, capacity, isopen, spotimage, id]);
            res.json(newSpot.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}