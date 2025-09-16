import express from 'express'
import { addAssignment,deleteAssignment,fetchAssignment, updateAssignment } from '../controllers/assignmentController.js';

const assignmentRouter = express.Router();

assignmentRouter.post('/addJUI098QW12',addAssignment);
assignmentRouter.get('/list',fetchAssignment);
assignmentRouter.put('/updateJIS12AKI09B/:id',updateAssignment);
assignmentRouter.delete('/deleteJUI1290LIOI12/:id',deleteAssignment);


export default assignmentRouter;