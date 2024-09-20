import express from 'express';
import mongoose, {Types} from 'mongoose';
import {CommentFields} from '../types';
import Comment from '../models/Comment';
import auth, {RequestWithUser} from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    const commentData: CommentFields = {
      user: req.user._id.toString(),
      post: req.body.post,
      content: req.body.content,
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

commentsRouter.get('/', async (req, res, next) => {
  try {
    const {postId} = req.query;

    const postFilter = postId ? {post: postId} : {};

    const comments = await Comment.find(postFilter).populate('user', 'username');

    return res.send(comments);

  } catch (error) {
    return next(error);
  }
});


export default commentsRouter;