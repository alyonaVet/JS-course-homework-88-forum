import {CommentCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addComment, fetchComments} from './CommentThunk';

export interface CommentState {
  comments: CommentCredentials[];
  commentsFetching: boolean;
  commentsLoading: boolean;
}

const initialState: CommentState = {
  comments: [],
  commentsFetching: false,
  commentsLoading: false,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.commentsFetching = true;
      })
      .addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
        state.commentsFetching = false;
        state.comments = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsFetching = false;
      });
    builder
      .addCase(addComment.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.commentsLoading = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.commentsLoading = false;
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentsFetching: (state) => state.commentsFetching,
    selectCommentLoading: (state) => state.commentsLoading,
  }
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsFetching,
  selectCommentLoading
} = commentsSlice.selectors;