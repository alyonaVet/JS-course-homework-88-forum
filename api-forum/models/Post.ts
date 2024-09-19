import mongoose, {HydratedDocument, Types} from 'mongoose';
import User from './User';
import {PostFields} from '../types';

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>, value: string) {
        return value || this.image;
      },
      message: 'Description is required if image is not provided',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>, value: string) {
        return value || this.description;
      },
      message: 'Image is required if description is not provided',
    },
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
