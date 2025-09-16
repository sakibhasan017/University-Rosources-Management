import { addPersonnel,fetchPersonnel } from "../controllers/personnelController.js";
import express from 'express';


const personnelRouter=express.Router();

personnelRouter.post("/addJUI912309",addPersonnel);
personnelRouter.get("/list",fetchPersonnel);

export default personnelRouter;