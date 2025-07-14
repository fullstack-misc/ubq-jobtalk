import { Router } from "express";
import { list } from "./controllers/list.js";

const JobsRouter = Router();

JobsRouter.get("/list", list);

export default JobsRouter;
