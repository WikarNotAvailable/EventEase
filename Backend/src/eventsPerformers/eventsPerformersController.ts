import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./eventsPerformersQueries";

export const addEventPerformer = async (req: any, res: any) => {
  try {
    const { event_id, performer_id }: Record<string, any> = req.body;
    const newEventPerformer: QueryResult<any> = await pool.query(queries.addEventPerformer, [event_id, performer_id]);

    return res.status(201).json(newEventPerformer.rows);

  } catch (err: any) {
    res.status(500).json(err);
  }
};

export const getEventsPerformers = async (req: any, res: any) => {
  try {
    pool.query(queries.getEventsPerformers, (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
    });
  } catch (err: any) {
    res.status(400).json(err);
  }
};

export const deleteEventPerformer = async (req: any, res: any) => {
  try {
    const event_id = parseInt(req.params.event_id);
    const performer_id = parseInt(req.params.performer_id);
    const eventPerformer: QueryResult<any> = await pool.query(queries.getEventPerformerById, [event_id, performer_id]);

    if(!eventPerformer.rows.length){
        res.status(400).json({message: "eventPerformer does not exist"})
    } else{
        pool.query(queries.deleteEventPerformer, [event_id, performer_id]);
        res.status(200).json({message: "Successfully deleted."});
    }
  } catch (err: any) {
    res.status(400).json(err);
  }
};

export const updateEventPerformer = async (req: any,res: any) => {
  try{
      const event_id = parseInt(req.params.event_id);
      const performer_id = parseInt(req.params.performer_id);
      const { new_event_id, new_performer_id }: Record<any, any> = req.body;
      console.log("event: " + new_event_id + "\nperformer: " + new_performer_id);

      const eventPerformer: QueryResult<any> = await pool.query(queries.getEventPerformerById, [event_id, performer_id]);
      
      if(!eventPerformer.rows.length){
          res.status(400).json({message: "eventPerformer does not exist. (Non existent id)"})
      }
      else {
          const newEventPerformer: QueryResult<any>  = await pool.query(queries.updateEventPerformer, [new_event_id, new_performer_id, event_id, performer_id]);
          res.json(newEventPerformer.rows);
      }
  }catch(err: any){
      return res.status(400).json(err);
  }
}
