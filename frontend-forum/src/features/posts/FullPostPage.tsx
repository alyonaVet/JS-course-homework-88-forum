import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOnePost} from './postsSlice';
import {CardMedia, Container, styled, Typography} from '@mui/material';
import {apiURL} from '../../constants';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchOnePost} from './postsThunk';
import {addComment, fetchComments} from '../comments/CommentThunk';
import {selectComments} from '../comments/CommentSlice';
import OneComment from '../comments/components/OneComment';
import CommentForm from '../comments/components/CommentForm';
import {CommentFields} from '../../types';
import {selectUser} from '../users/usersSlice';
import {grey} from '@mui/material/colors';

const FullPostPage = () => {
  const dispatch = useAppDispatch();
  const onePost = useAppSelector(selectOnePost);
  const {id} = useParams() as { id: string };
  const comments = useAppSelector(selectComments);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const onFormSubmit = async (comment: CommentFields) => {
    await dispatch(addComment(comment));
    await dispatch(fetchComments(id));
  };

  const ImageCardMedia = styled(CardMedia)({
    width: '80%',
    maxWidth: '1000px',
    height: '300px',
    minHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    margin: '0 auto',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  });

  const cardImage = onePost?.image ? apiURL + '/' + onePost.image : '';

  return (
    <Container maxWidth="lg" sx={{mt: 2}}>
      {cardImage && (
        <ImageCardMedia image={cardImage}/>
      )}
      <Typography variant="h4" component="h1" sx={{mt: 2, mb: 1}}>
        {onePost?.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {dayjs(onePost?.datetime).format('DD.MM.YYYY HH:mm:ss')}
      </Typography>
      <Typography variant="body1" sx={{mt: 2, mb: 1}}>
        {onePost?.description}
      </Typography>
      <Typography variant="subtitle2" component="div" sx={{color: 'text.secondary', textAlign: 'right'}}>
        by {onePost?.user.username}
      </Typography>
      {comments.map((comment) => (
        <OneComment
          key={comment._id}
          user={comment.user.username}
          content={comment.content}
        />
      ))}
      {user ? (
        <CommentForm onSubmit={onFormSubmit} isLoading={false}/>
      ) : (
        <Typography
          variant="body2"
          sx={{color: grey[500], mt: 3, textAlign: 'center', mb: 3}}
        >
          You should be logged in to add the comment.
        </Typography>
      )}
    </Container>
  );
};

export default FullPostPage;