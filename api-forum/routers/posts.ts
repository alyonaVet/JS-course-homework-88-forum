import express from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Post from '../models/Post';
import {imagesUpload} from '../multer';

export const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    if (!req.body.title) {
      return res.status(400).send({error: "Title must be present in the request"});
    }

    const post = new Post({
      user: req.user._id,
      title: req.body.title,
      datetime: new Date(),
      description: req.body.description || null,
      image: req.file ? req.file.filename : null,
    });

    await post.save();
    return res.send(post);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({datetime: -1});
    return res.send(posts);
  } catch (error) {
    return next(error);
  }
});

postsRouter.get('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Post ID is not valid' });
    }

    const post = await Post.findById(req.params.id).populate('user', 'username');

    if (post === null) {
      return res.status(404).send({error: 'Post not found'});
    }

    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default postsRouter;