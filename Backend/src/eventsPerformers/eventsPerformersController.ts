import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./eventsPerformersQueries";

export const addEventPerformer = async (req: any, res: any) => {
  try {
    const { event_id, performer_id }: Record<string, any> = req.body;
    const newEventPerformer: QueryResult<any> = await pool.query(queries.addEventPerformer, [event_id, performer_id]);

    res.json(newEventPerformer.rows);
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

export const getEventPerformerByEventId = async (req: any, res: any) => {
  try {
    const event_id = parseInt(req.params.event_id);

    pool.query(queries.getEventPerformerByEventId, [event_id], (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
    });
  } catch (err: any) {
    res.status(400).json(err);
  }
};

export const getEventPerformerByPerformerId = async (req: any, res: any) => {
  try {
    const performer_id = parseInt(req.params.performer_id);

    pool.query(queries.getEventPerformerByPerformerId, [performer_id], (error, results) => {
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

    const deletedEventPerformer: QueryResult<any> = await pool.query(queries.deleteEventPerformer, [event_id, performer_id]);

    res.json(deletedEventPerformer.rows);
  } catch (err: any) {
    res.status(400).json(err);
  }
};
