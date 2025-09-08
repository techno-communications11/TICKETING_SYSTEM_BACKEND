import express from 'express';
import { createCommentController, getAllCommentController } from '../controllers/comment.controllers.js';

const commentRouter = express.Router();

commentRouter.post('/createComment',createCommentController)
commentRouter.get('/getAllComments',getAllCommentController)

export default commentRouter;