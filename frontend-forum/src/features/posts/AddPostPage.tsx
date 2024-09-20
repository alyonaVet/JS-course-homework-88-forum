import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Box, Typography} from '@mui/material';
import PostForm from './components/PostForm';
import {addPost, fetchAllPosts} from './postsThunk';
import {PostFields} from '../../types';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';
import {selectPostsLoading} from './postsSlice';

const AddPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const postLoading = useAppSelector(selectPostsLoading);


  const onFormSubmit = async (post: PostFields) => {
    await dispatch(addPost(post));
    await dispatch(fetchAllPosts());
    navigate('/');
  };

  return (
    <Box sx={{m: 4}}>
      {user ? (
        <>
          <Typography variant="h4" mb={5}>Add new post</Typography>
          <PostForm onSubmit={onFormSubmit} isLoading={postLoading}/>
        </>
      ) : (
        <Typography variant="h4" textAlign={'center'}>You should be logged in to add the post.</Typography>
      )}
    </Box>
  );
};

export default AddPostPage;