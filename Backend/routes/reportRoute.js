import { addReport,fetchReport,updateReport,deleteReport } from "../controllers/reportController.js";
import express from 'express';

const router = express.Router();

router.post("/addReport",addReport);
router.get("/list",fetchReport);
router.put("/updateReport/:id",updateReport);
router.delete("/deleteReport/:id",deleteReport);

export default router;