import {PostCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addPost, fetchAllPosts, fetchOnePost} from './postsThunk';

export interface PostState {
  posts: PostCredentials[];
  postsLoading: boolean;
  onePost: PostCredentials | null;
  oneFetching: boolean;
}

const initialState: PostState = {
  posts: [],
  postsLoading: false,
  onePost: null,
  oneFetching: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, {payload: posts}) => {
        state.postsLoading = false;
        state.posts = posts;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.postsLoading = false;
      });
    builder
      .addCase(addPost.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.postsLoading = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.postsLoading = false;
      });
    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.onePost = null;
        state.oneFetching = true;
      })
      .addCase(fetchOnePost.fulfilled, (state, { payload: onePost }) => {
        state.onePost = onePost;
        state.oneFetching = false;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.oneFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsLoading: (state) => state.postsLoading,
    selectOnePost: (state) => state.onePost,
    selectOneFetching: (state) => state.oneFetching,
  }
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectPostsLoading,
  selectOnePost,
  selectOneFetching,
} = postsSlice.selectors;
