import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentCredentials, CommentFields, GlobalError} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchComments = createAsyncThunk<CommentCredentials[], string>(
  'comments/fetchComments',
  async (postId) => {
    const {data: comments} = await axiosApi<CommentCredentials[]>(`/comments?postId=${postId}`);
    return comments;
  }
);

export const addComment = createAsyncThunk<void, CommentFields, { rejectValue: GlobalError, state: RootState }>(
  'comments/addComment',
  async (commentData, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to add a post.'});
      }

      await axiosApi.post('/comments', commentData, {headers: {Authorization: `Bearer ${token}`}})

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);