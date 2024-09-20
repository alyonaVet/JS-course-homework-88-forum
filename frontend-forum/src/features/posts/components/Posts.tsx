import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectPosts} from '../postsSlice';
import {useEffect} from 'react';
import {fetchAllPosts} from '../postsThunk';
import {Container} from '@mui/material';
import PostItem from './PostItem';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch])

  return (
    <Container maxWidth="sm" sx={{mt: 5}}>
      {posts.map((post) => (
        <PostItem key={post._id}
              title={post.title}
              datetime={post.datetime}
              user={post.user.username}
              image={post.image}
        />
      ))}
    </Container>
  );
};

export default Posts;