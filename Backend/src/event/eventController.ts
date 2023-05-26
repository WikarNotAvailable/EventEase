import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./eventQueries";

export const addEvent = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      begindate,
      enddate,
      availabletickets,
      currentlytakentickets,
      spot_id,
      eventtype_id,
      company_id,
      discussion_id,
    } = req.body;

    const newEvent: QueryResult<any> = await pool.query(queries.addEvent, [
      name,
      description,
      begindate,
      enddate,
      availabletickets,
      currentlytakentickets,
      spot_id,
      eventtype_id,
      company_id,
      discussion_id,
    ]);

    return res.status(201).json(newEvent.rows[0]);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEvents = async (req: any, res: any) => {
  try {
    const events: QueryResult<any> = await pool.query(queries.getEvents);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventById = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const event: QueryResult<any> = await pool.query(queries.getEventById, [id]);
    
    if (event.rows.length) {
      return res.status(200).json(event.rows[0]);

    } else {
      return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
    }
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const deleteEvent = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const event: QueryResult<any> = await pool.query(queries.getEventById, [id]);

    if (!event.rows.length) {
      return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
    } else {
      await pool.query(queries.deleteEvent, [id]);
      return res.status(200).json({ message: "Event successfully deleted." });
    }
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const updateEvent = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      description,
      begindate,
      enddate,
      availabletickets,
      currentlytakentickets,
      spot_id,
      eventtype_id,
      company_id,
      discussion_id,
    } = req.body;

    const event: QueryResult<any> = await pool.query(queries.getEventById, [id]);

    if (!event.rows.length) {
      return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
    } else {
      const updatedEvent: QueryResult<any> = await pool.query(queries.updateEvent, [
        name,
        description,
        begindate,
        enddate,
        availabletickets,
        currentlytakentickets,
        spot_id,
        eventtype_id,
        company_id,
        discussion_id,
        id,
      ]);

      return res.status(200).json(updatedEvent.rows[0]);
    }
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsBySpotId = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const events: QueryResult<any> = await pool.query(queries.getEventsBySpotId, [id]);

    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsByPerformerId = async (req: any, res: any) => {
  try {
    const id = req.params.id;  
    const events: QueryResult<any> = await pool.query(queries.getEventsByPerformerId, [id]);
    return res.status(200).json(events.rows);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getEventsByEventTypeId = async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id);
    const events: QueryResult<any> = await pool.query(queries.getEventsByEventTypeId, [id]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsWithinDateRange = async (req: any, res: any) => {
  try {
    const { begin, end } = req.params;
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const events: QueryResult<any> = await pool.query(queries.getEventsWithinDateRange, [beginDate, endDate]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsWithAvailableTickets = async (req: any, res: any) => {
  try {
    const events: QueryResult<any> = await pool.query(queries.getEventsWithAvailableTickets);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsWithLimitedAvailability = async (req: any, res: any) => {
  try {
    const { limit } = req.params;
    const events: QueryResult<any> = await pool.query(queries.getEventsWithLimitedAvailability, [limit]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsWithSoldOutTickets = async (req: any, res: any) => {
  try {
    const events: QueryResult<any> = await pool.query(queries.getEventsWithSoldOutTickets);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};
