import {PostCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAllPosts} from './postsThunk';

export interface PostState {
  posts: PostCredentials[];
  postsLoading: boolean;
}

const initialState: PostState = {
  posts: [],
  postsLoading: false,
}

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
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsLoading: (state) => state.postsLoading
  }
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectPostsLoading,
} = postsSlice.selectors;
