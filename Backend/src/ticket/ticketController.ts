import pool from "../../db"
import { QueryResult } from "pg";
import * as queries from "./ticketQueries";

export const postTicket = async (req: any, res: any) => {
    try{ 
        const {ticketTypeID, eventID, price, withPlaces} = req.body;

        const eventInDatabase: QueryResult<any> = await pool.query(queries.checkEventExists, [eventID]); 

        const ticketTypeInDatabase: QueryResult<any> = await pool.query(queries.checkTicketTypeExists, [ticketTypeID]);

        const availableTickets: QueryResult<any> = await pool.query(queries.getAvailableTickets, [eventID]);

        const currentlytakentickets: QueryResult<any> = await pool.query(queries.getCurrentlyTakenTickets, [eventID]);

        const ticketsCount: QueryResult<any> = await pool.query(queries.getTicketsCount, [eventID]);

        if (eventInDatabase.rows.length == 0){
            return res.status(400).json({message: "Event doest not exist."});
        }
        else if (ticketTypeInDatabase.rows.length == 0){
            return res.status(400).json({message: "Ticket type does not exist."});
        }
        else if(availableTickets.rows[0]["availabletickets"] + currentlytakentickets.rows[0]["currentlytakentickets"] == ticketsCount.rows[0]["ticketscount"]){
            return res.status(400).json({message: "Cannot add more tickets for this event."});
        }
        else {
            let ticketPlace;

            if(withPlaces){
                const ticketsMaxPlace: QueryResult<any> = await pool.query(queries.getMaxTicketPlace, [eventID]);
                ticketPlace = ticketsMaxPlace.rows[0]["maxplace"] + 1;
            }

            let newTicket: QueryResult<any> = await pool.query(queries.addTicket, [ticketTypeID, eventID, null, price, ticketPlace, true]);

            return res.status(201).json(newTicket.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const postNTickets = async (req: any, res: any) => {
    try{ 
        const ticketsNumber = parseInt(req.params.number); 

        const {ticketTypeID, eventID, price, withPlaces} = req.body;

        const eventInDatabase: QueryResult<any> = await pool.query(queries.checkEventExists, [eventID]); 

        const ticketTypeInDatabase: QueryResult<any> = await pool.query(queries.checkTicketTypeExists, [ticketTypeID]);

        const availableTickets: QueryResult<any> = await pool.query(queries.getAvailableTickets, [eventID]);

        const currentlytakentickets: QueryResult<any> = await pool.query(queries.getCurrentlyTakenTickets, [eventID]);

        const ticketsCount: QueryResult<any> = await pool.query(queries.getTicketsCount, [eventID]);

        if (eventInDatabase.rows.length == 0){
            return res.status(400).json({message: "Event doest not exist."});
        }
        else if (ticketTypeInDatabase.rows.length == 0){
            return res.status(400).json({message: "Ticket type does not exist."});
        }
        else if(ticketsNumber < 1){
            return res.status(400).json({message: "Number of tickets to add cannot be lower than 1."});
        }
        else if(Number(availableTickets.rows[0]["availabletickets"]) + Number(currentlytakentickets.rows[0]["currentlytakentickets"]) < Number(ticketsCount.rows[0]["ticketscount"]) + ticketsNumber){
            return res.status(400).json({message: "To many tickets to add."});
        }
        else {
            if(withPlaces){
                let ticketPlaceStart;
                const ticketsMaxPlace: QueryResult<any> = await pool.query(queries.getMaxTicketPlace, [eventID]);
                ticketPlaceStart = ticketsMaxPlace.rows[0]["maxplace"];

                for (let i = 1; i <= ticketsNumber; i++){
                    await pool.query(queries.addTicket, [ticketTypeID, eventID, null, price, ticketPlaceStart+i, true]);
                }
            }
            else{
                for (let i = 1; i <= ticketsNumber; i++){
                    await pool.query(queries.addTicket, [ticketTypeID, eventID, null, price, null, true]);
                }
            }

            return res.status(201).json({meesage: "Tickets were added successfuly."});
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}
export const getTickets = async (req: any,res: any) => {
    try{
        pool.query(queries.getTickets, (error, results) => {
            if (error) throw error;

            res.status(200).json(results.rows);
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTicketById = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);

        pool.query(queries.getTicketById, [id], async (error, results) => {
            if (error) throw error;

            if (results.rows.length){   
                results.rows[0]["transaction"] = (await pool.query(queries.getTransactionForTicket, [results.rows[0]["transaction_id"]])).rows;
                results.rows[0]["event"] = (await pool.query(queries.getEventForTicket, [results.rows[0]["event_id"]])).rows;

                res.status(200).json(results.rows[0]);
            }
            else{
                res.status(400).json({message: "Ticket does not exist. (Non existent id)"});
            }  
        })
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const deleteTicket = async (req: any,res: any) => {
    try{
        const id = parseInt(req.params.id);
        const ticket: QueryResult<any> = await pool.query(queries.getTicketById, [id]);

        if(!ticket.rows.length){
            res.status(400).json({message: "Ticket does not exist. (Non existent id)"});
        }
        else {
            if(ticket.rows[0]["transaction_id"] != null){
                const availableTickets: QueryResult<any> = await pool.query(queries.getAvailableTickets, [ticket.rows[0]["event_id"]]);
                const currentlytakentickets: QueryResult<any> = await pool.query(queries.getCurrentlyTakenTickets, [ticket.rows[0]["event_id"]]);

                await pool.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] + 1, currentlytakentickets.rows[0][" currentlytakentickets"] - 1, ticket.rows[0]["event_id"]]);
            }
            pool.query(queries.deleteTicket, [id], (error, results) => {
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
        let {price, transactionID, isAvailable} = req.body;

        const ticket: QueryResult<any> = await pool.query(queries.getTicketById, [id]);
        const availableTickets: QueryResult<any> = await pool.query(queries.getAvailableTickets, [ticket.rows[0]["event_id"]]);
        const currentlytakentickets: QueryResult<any> = await pool.query(queries.getCurrentlyTakenTickets, [ticket.rows[0]["event_id"]]);
        let transactionInDatabase: QueryResult<any> | null = null;           
        
        if(price == null)
            price = ticket.rows[0]["price"];
        if(isAvailable == true){
            transactionID = null;
        }        
        else{
            if(transactionID != null){
                isAvailable = false;
                transactionInDatabase = await pool.query(queries.getTransactionByID, [transactionID]);
            }
            else{
                isAvailable = ticket.rows[0]["isavailable"];
                transactionInDatabase = await pool.query(queries.getTransactionForTicket, [id]);
                if(transactionInDatabase.rows.length != 0){
                    transactionID = transactionInDatabase.rows[0]["transaction_id"];
                }
            }
        }
        if(!ticket.rows.length){
            res.status(400).json({message: "Ticket does not exist. (Non existent id)"})
        }
        else if (transactionID != null && transactionInDatabase?.rows.length == 0 ){
            return res.status(400).json({message: "Transaction doest not exist."});
        }
        else {
            if(isAvailable == true && ticket.rows[0]["isavailable"] == false){
                await pool.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] + 1, currentlytakentickets.rows[0]["currentlytakentickets"] - 1, ticket.rows[0]["event_id"]]);
            }
            else if(isAvailable == false && ticket.rows[0]["isavailable"] == true){
                await pool.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] - 1, currentlytakentickets.rows[0]["currentlytakentickets"] + 1, ticket.rows[0]["event_id"]]);
            }
            
            const newTicket: QueryResult<any>  = await pool.query(queries.updateTicket, [price, isAvailable, transactionID, id]);
            res.status(200).json(newTicket.rows[0]);
        }
    }catch(err: any){
        return res.status(400).json(err);
    }
}

export const getTicketsForEvent = async (req: any,res: any) => {
    try{
        const eventID = req.query.eventID;
        const price = req.query.price;

       if(eventID == null){
        res.status(400).json({message: "You did not pass eventID."})
       }
       else if(price == null){
        let tickets: QueryResult<any> = await pool.query(queries.getAllTicketsForEvent, [eventID]);

        res.status(200).json(tickets.rows);
       }
       else{
        let tickets: QueryResult<any> = await pool.query(queries.getTicketsForEvent, [eventID, price]);

        res.status(200).json(tickets.rows);
       }   
    }catch(err: any){
        return res.status(400).json(err);
    }
}