import express from "express";
import mongoose from 'mongoose';
import {CommentFields} from '../types';
import Comment from '../models/Comment';
import auth, {RequestWithUser} from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.post("/", auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const commentData: CommentFields = {
      user: req.user._id.toString(),
      post: req.body.post,
      content: req.body.content,
      createdAt: new Date(),
    };

    const comment = new Comment(commentData);
    await comment.save();
    return res.send(comment);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default commentsRouter;