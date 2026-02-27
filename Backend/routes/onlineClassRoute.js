import { addOnlineClass,fetchOnlineClass,updateOnlineClass,deleteOnlineClass } from "../controllers/onlineClassController.js";
import express from 'express';

const router = express.Router();
router.post("/addOnlineClass",addOnlineClass);
router.get("/list",fetchOnlineClass);
router.put("/updateOnlineClass/:id",updateOnlineClass);
router.delete("/deleteOnlineClass/:id",deleteOnlineClass);

export default router;