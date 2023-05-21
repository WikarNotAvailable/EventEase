import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./userQueries";
import * as passwordHash from "password-hash";

export const postUser = async (req: any, res: any) => {
    try{ 
        const {userTypeID, name, surname, email, phoneNumber, birthday, password} = req.body;

        const emailInDatabase: QueryResult<any> = await pool.query(queries.checkEmailExists, [email]); 
            
        const phoneNumberInDatabase: QueryResult<any> = await pool.query(queries.checkPhoneNumberExists, [phoneNumber]); 

        const userTypeInDatabase: QueryResult<any> = await pool.query(queries.checkUserTypeExists, [userTypeID]);

        if (emailInDatabase.rows.length){
            return res.status(400).json({message: "Email already exists."});
        }
        else if (phoneNumberInDatabase.rows.length){
            return res.status(400).json({message: "Phone number already exists."});
        }
        else if (userTypeInDatabase.rows.length == 0){
            return res.status(400).json({message: "User type does not exist."});
        }
        else {
            let newUser: QueryResult<any> = await pool.query(queries.addUser, [userTypeID, name, surname, email, phoneNumber, birthday, password]);
            newUser.rows[0]["password"] = passwordHash.generate(newUser.rows[0]["password"]);

            return res.status(201).json(newUser.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getUsers = async (req: any,res: any) => {
    try{
        pool.query(queries.getUsers, (error, results) => {
            if (error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getUserById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getUserById, [id], async (error, results) => {
            if (error) throw error;

            if (results.rows.length){   
                results.rows[0]["transactions"] = (await pool.query(queries.getTransactionsForUser, [results.rows[0]["user_id"]])).rows;
                results.rows[0]["password"] = passwordHash.generate(results.rows[0]["password"]);

                res.status(200).json(results.rows);
            }
            else{
                res.status(400).json({message: "User does not exist. (Non existent id)"});
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteUser = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const user: QueryResult<any> = await pool.query(queries.getUserById, [id]);

        if(!user.rows.length){
            res.status(400).json({message: "User does not exist. (Non existent id)"});
        }
        else {
            pool.query(queries.deleteUser, [id], (error, results) => {
            if (error) throw error;

            res.status(200).json({message: "Successfully deleted."});
            })
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const updateUser = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        let {name, surname, email, phoneNumber, birthday, password} = req.body;
        const user: QueryResult<any> = await pool.query(queries.getUserById, [id]);

        let emailInDatabase: QueryResult<any> | null = null;           
        let phoneNumberInDatabase: QueryResult<any> | null = null;
            
        if(name == null)
            name = user.rows[0]["name"];
        if(surname == null)
            surname = user.rows[0]["surname"];

        if(email == null)
            email = user.rows[0]["email"];
        else
            emailInDatabase = await pool.query(queries.checkEmailExists, [email]); 

        if(phoneNumber == null)
            phoneNumber = user.rows[0]["phone_number"];
        else
            phoneNumberInDatabase = await pool.query(queries.checkPhoneNumberExists, [phoneNumber]); 

        if(birthday == null)
            birthday = user.rows[0]["birthday"];
        if(password == null)
            password = user.rows[0]["password"];
    
        if(!user.rows.length){
            res.status(400).json({message: "User does not exist. (Non existent id)"})
        }
        else if (emailInDatabase != null && emailInDatabase.rows.length && id != user.rows[0]["user_id"]){
            return res.status(400).json({message: "Email already exists."});
        }
        else if (phoneNumberInDatabase != null && phoneNumberInDatabase.rows.length && id != user.rows[0]["user_id"]){
            return res.status(400).json({message: "Phone number already exists."});
        }
        else {
            const newUser: QueryResult<any>  = await pool.query(queries.updateUser, [name, surname, email, phoneNumber, birthday, password, id]);
            res.json(newUser.rows);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const loginUser = async (req: any, res: any) => {
    try{ 
        const {email, password} = req.body;
        const emailInDatabase: QueryResult<any> = await pool.query(queries.checkEmailExists, [email]); 

        if (!emailInDatabase.rows.length){
            return res.json({message: "Email does not exist."});
        }
        else {
            pool.query(queries.loginUser, [email,  password], (error, results) => {
                if(results.rows.length){
                    return res.status(200).json({login: "Succeeded", userData: results.rows});
                }
                else{
                    return res.status(400).json({login: "Failed"});
                }
            })
            
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}
