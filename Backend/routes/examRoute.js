import express from 'express'
import { addExam, deleteExam, fetchExam, updateExam } from '../controllers/examController.js';

const examRouter = express.Router();

examRouter.post('/addJUIFJJD128OI',addExam);
examRouter.get('/list',fetchExam);
examRouter.put('/updateJUIQ183JDM2/:id',updateExam);
examRouter.delete('/deleteJUIQ23uiQW1/:id',deleteExam);


export default examRouter;