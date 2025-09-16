import express from 'express';
import { addWeek,fetchWeeks,addSubject,deleteSubject,updateSubject,deleteWeek} from '../controllers/weeklyController.js';

const weeklyRouter = express.Router();

weeklyRouter.post('/add', addWeek);
weeklyRouter.get('/list', fetchWeeks);
weeklyRouter.post('/:id/add-subject', addSubject);
weeklyRouter.delete('/:id/delete-subject', deleteSubject);
weeklyRouter.put('/:id/update-subject', updateSubject);
weeklyRouter.delete('/:id/delete', deleteWeek);

export default weeklyRouter;