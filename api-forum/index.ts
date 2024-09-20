import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import usersRouter from './routers/users';
import postsRouter from './routers/posts';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);


const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);