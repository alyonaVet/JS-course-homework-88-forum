import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (error) {
    console.log('Collections were not present, skipping drop...');
  }

  const [johnUser, saraUser] = await User.create({
      username: 'John Doe',
      password: '123qwe',
      token: crypto.randomUUID()
    }, {
      username: 'Sara Conor',
      password: '456qwe',
      token: crypto.randomUUID()
    }
  );

  const [post1, post2] = await Post.create({
      user: johnUser,
      title: 'The Serenity of Forests',
      description: 'Walking through a forest feels like stepping into a world of peace. The rustling leaves and the distant chirps of birds create a soothing symphony that refreshes the soul.',
      datetime: new Date(),
      image: 'fixtures/forest.jpeg'
    }, {
      user: saraUser,
      title: 'The Beauty of Sunsets',
      description: 'As the sun dips below the horizon, the sky bursts into hues of orange and pink. Each sunset is a gentle reminder of the beauty that nature offers, even at the close of the day.',
      datetime: new Date(),
      image: 'fixtures/sunset.jpeg'
    },
  );

  await Comment.create({
    user: saraUser,
    post: post1,
    content: 'Very good post',
  }, {
      user: johnUser,
      post: post1,
      content: 'Wow, I like it',
    }, {
      user: saraUser,
      post: post2,
      content: 'I would like to be there',
    }, {
      user: johnUser,
      post: post2,
      content: 'Amazing post',
    },
  );


  await db.close();
};

run().catch(console.error);