import express from 'express'
import { addCalendar,deleteCalendar,fetchCalendar, updateCalendar } from '../controllers/calendarController.js';

const calendarRouter = express.Router();

calendarRouter.post('/addJUNI19R09JH12OR',addCalendar);
calendarRouter.get('/list',fetchCalendar);
calendarRouter.put('/updateJUNI12R34JH56OR/:id',updateCalendar);
calendarRouter.delete('/deleteJUNI09R23JH87OR/:id',deleteCalendar);


export default calendarRouter;