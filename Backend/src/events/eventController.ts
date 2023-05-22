import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./eventQueries";

export const addEvent = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      BeginDate,
      EndDate,
      AvailableTickets,
      CurrentlyTakenTickets,
      spot_id,
      eventtype_id,
      company_id,
      discussion_id,
    } = req.body;

    const newEvent: QueryResult<any> = await pool.query(queries.addEvent, [
      name,
      description,
      BeginDate,
      EndDate,
      AvailableTickets,
      CurrentlyTakenTickets,
      spot_id,
      eventtype_id,
      company_id,
      discussion_id,
    ]);

    return res.status(201).json(newEvent.rows);
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
      return res.status(200).json(event.rows);
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
      BeginDate,
      EndDate,
      AvailableTickets,
      CurrentlyTakenTickets,
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
        BeginDate,
        EndDate,
        AvailableTickets,
        CurrentlyTakenTickets,
        spot_id,
        eventtype_id,
        company_id,
        discussion_id,
        id,
      ]);

      return res.status(200).json(updatedEvent.rows);
    }
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsBySpotId = async (req: any, res: any) => {
  try {
    const spotId = parseInt(req.params.spotId);
    const events: QueryResult<any> = await pool.query(queries.getEventsBySpotId, [spotId]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsByEventTypeId = async (req: any, res: any) => {
  try {
    const eventTypeId = parseInt(req.params.eventTypeId);
    const events: QueryResult<any> = await pool.query(queries.getEventsByEventTypeId, [eventTypeId]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsByCompanyId = async (req: any, res: any) => {
  try {
    const companyId = parseInt(req.params.companyId);
    const events: QueryResult<any> = await pool.query(queries.getEventsByCompanyId, [companyId]);
    return res.status(200).json(events.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const getEventsWithinDateRange = async (req: any, res: any) => {
  try {
    const { startDate, endDate } = req.params;
    const events: QueryResult<any> = await pool.query(queries.getEventsWithinDateRange, [startDate, endDate]);
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
