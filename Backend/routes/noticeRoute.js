import express from 'express'
import { addNotice, deleteNotice, fetchNotice, updateNotice } from '../controllers/noticeController.js';

const noticeRouter = express.Router();

noticeRouter.post('/addJOQ12NHF894JUPO',addNotice);
noticeRouter.get('/list',fetchNotice);
noticeRouter.put('/updateJOQ12HJK23KOL19/:id',updateNotice);
noticeRouter.delete('/deleteJOQ12ERM0PKO12/:id',deleteNotice);


export default noticeRouter;