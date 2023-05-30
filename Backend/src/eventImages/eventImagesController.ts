import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./eventImagesQueries";

export const addEventImage = async (req: any, res: any) => {
  try {
    const { url, event_id } = req.body;
    const newEventImage: QueryResult<any> = await pool.query(queries.addEventImage, [url, event_id]);

    res.json(newEventImage.rows[0]);
  } catch (err: any) {
    res.status(500).json(err);
  }
};

export const getEventImages = async (req: any, res: any) => {
  try {

    pool.query(queries.getEventImages, (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
    });
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventImageById = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);

    pool.query(queries.getEventImageById, [id], (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows[0]);
    });
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventImagesByEventId = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);

    pool.query(queries.getEventImagesByEventId, [id], (error, results) => {
      if (error) throw error;

      res.status(200).json(results.rows);
    });
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const updateEventImage = async (req: any, res: any) => {
  try {
    const { url, event_id } = req.body;
    const { eventimage_id } = req.params;
    const updatedEventImage: QueryResult<any> = await pool.query(queries.updateEventImage, [url, event_id, eventimage_id]);

    res.json(updatedEventImage.rows[0]);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const deleteEventImage = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);

    const deletedEventImage: QueryResult<any> = await pool.query(queries.deleteEventImage, [id]);

    if (deletedEventImage.rowCount === 0) {
      res.status(400).json({ message: "Event image does not exist. (Non-existent id)" });
    } else {
      res.json({ message: "Event image deleted successfully." });
    }
  } catch (err: any) {
    return res.status(400).json(err);
  }
};
