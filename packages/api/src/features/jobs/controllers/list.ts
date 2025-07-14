import { db } from '../../../../db/db';
import {Request, Response} from "express";

export const list = (req: Request, res: Response) => {
  res.json(db.data.jobs);
};
