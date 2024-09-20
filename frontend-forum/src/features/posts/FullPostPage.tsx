import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOnePost} from './postsSlice';
import {CardMedia, Container, styled, Typography} from '@mui/material';
import {apiURL} from '../../constants';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchOnePost} from './postsThunk';

const FullPostPage = () => {
  const dispatch = useAppDispatch();
  const onePost = useAppSelector(selectOnePost);
  const {id} = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

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
    </Container>
  );
};

export default FullPostPage;