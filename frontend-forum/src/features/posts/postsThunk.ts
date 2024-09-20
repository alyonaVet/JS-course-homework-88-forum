import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, PostCredentials, PostFields} from '../../types';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';

export const addPost = createAsyncThunk<void, PostFields, { rejectValue: GlobalError, state: RootState }>(
  'posts/addPost',
  async (postData, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to add a post.'});
      }

      const formData = new FormData();

      formData.append('title', postData.title);

      if (postData.description) {
        formData.append('description', postData.description);
      }
      if (postData.image) {
        formData.append('image', postData.image);
      }

      await axiosApi.post('/posts', formData, {headers: {Authorization: `Bearer ${token}`}});

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchAllPosts = createAsyncThunk<PostCredentials[], void>(
  'posts/fetchAll',
  async () => {
    const {data: posts} = await axiosApi.get<PostCredentials[]>('/posts');
    return posts;
  }
);

export const fetchOnePost = createAsyncThunk<PostCredentials, string>(
  'products/fetchOne',
  async (id) => {
    const {data: post} = await axiosApi.get<PostCredentials>(`/posts/${id}`);
    return post;
  });