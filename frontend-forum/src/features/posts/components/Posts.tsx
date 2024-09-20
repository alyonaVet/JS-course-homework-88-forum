import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectPosts, selectPostsLoading} from '../postsSlice';
import {useEffect} from 'react';
import {fetchAllPosts} from '../postsThunk';
import {Box, CircularProgress, Container} from '@mui/material';
import PostItem from './PostItem';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{mt: 5}}>
      {isLoading ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post._id}
            id={post._id}
            title={post.title}
            datetime={post.datetime}
            user={post.user.username}
            image={post.image}
          />
        ))
      )}
    </Container>
  );
};

export default Posts;