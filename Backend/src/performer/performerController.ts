import { Request, Response } from 'express';
import pool from "../../db";
import { QueryResult } from "pg";
import * as queries from "./performerQueries";

export const addPerformer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { performertype_id, name, description, url } = req.body;
  
      const performerNameExists: QueryResult<any> = await pool.query(queries.checkPerformerNameExists, [name]);
  
      if (performerNameExists.rows.length) {
        return res.status(400).json({ message: 'Performer name already exists.' });
      } else {
        const newPerformer: QueryResult<any> = await pool.query(queries.addPerformer, [
          performertype_id,
          name,
          description,
          url,
        ]);
        return res.status(201).json(newPerformer.rows[0]);
      }
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };
  
  export const getPerformers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const performers: QueryResult<any> = await pool.query(queries.getPerformers);
      return res.status(200).json(performers.rows);
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };
  
  export const getPerformerById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = parseInt(req.params.id);
  
      const performer: QueryResult<any> = await pool.query(queries.getPerformerById, [id]);
  
      if (performer.rows.length) {
        return res.status(200).json(performer.rows[0]);
      } else {
        return res.status(400).json({ message: 'Performer does not exist.' });
      }
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };

  export const getPerformersByType = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, limit } = req.params;
    const parsedId: number = parseInt(id);
    const parsedLimit: number | null = limit ? parseInt(limit) : null;

    const performers: QueryResult<any> = await pool.query(queries.getPerformersByType, [
      parsedId,
      parsedLimit,
    ]);

    return res.status(200).json(performers.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

  export const getPerformerByName = async (req: any, res: any) => {
    try {
      const name = req.params.name;
      const performer: QueryResult<any> = await pool.query(queries.getPerformerByName, [name]);

      if (performer.rows.length) {
        return res.status(200).json(performer.rows);
      } else {
        return res.status(400).json({ message: "Performer does not exist. (Nonexistent name)" });
      }
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };

  
export const getPerformersByEventId = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);

    const performers: QueryResult<any> = await pool.query(queries.getPerformersByEventId, [id]);

    return res.status(200).json(performers.rows);
  } catch (err: any) {
    return res.status(400).json(err);
  }
};
  
  export const deletePerformer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = parseInt(req.params.id);
  
      const performer: QueryResult<any> = await pool.query(queries.getPerformerById, [id]);
  
      if (!performer.rows.length) {
        return res.status(400).json({ message: 'Performer does not exist.' });
      } else {
        await pool.query(queries.deletePerformer, [id]);
        return res.status(200).json({ message: 'Performer successfully deleted.' });
      }
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };
  
  export const updatePerformer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = parseInt(req.params.id);
      const { performertype_id, name, description, url } = req.body;
  
      const performer: QueryResult<any> = await pool.query(queries.getPerformerById, [id]);
  
      if (!performer.rows.length) {
        return res.status(400).json({ message: 'Performer does not exist.' });
      } else {
        const performerNameExists: QueryResult<any> = await pool.query(queries.checkPerformerNameExists, [name]);
        if (performerNameExists.rows.length) {
          return res.status(400).json({ message: 'Performer name already exists.' });
        }
        
        const updatedPerformer: QueryResult<any> = await pool.query(queries.updatePerformer, [
          performertype_id,
          name,
          description,
          url,
          id,
        ]);
        return res.json(updatedPerformer.rows[0]);
      }
    } catch (err: any) {
      return res.status(400).json(err);
    }
  };
  