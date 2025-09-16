import express from 'express'
import { addFeedback,deleteFeedback,fetchFeedback, updateFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/add',addFeedback);
feedbackRouter.get('/list',fetchFeedback);
//feedbackRouter.put('/update/:id',updateFeedback);
feedbackRouter.delete('/delete/:id',deleteFeedback);


export default feedbackRouter;