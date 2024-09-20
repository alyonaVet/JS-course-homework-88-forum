import React from 'react';
import {Box, Card, CardContent, CardMedia, Link, Stack, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import dayjs from 'dayjs';
import {Link as RouterLink} from 'react-router-dom';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

interface Props {
  id: string;
  user: string;
  title: string;
  datetime: string;
  image: string | null;
}

const PostItem: React.FC<Props> = ({id, user, title, image, datetime}) => {
  const ImageCardMedia = styled(CardMedia)({
    width: 230,
    objectFit: 'cover',
    borderRadius: 'rounded',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Card sx={{
      display: 'flex',
      width: '100%',
      height: 150,
      border: '1px solid #bdbdbd',
      mb: 4,
    }}>
      <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        {image ? (
          <ImageCardMedia image={cardImage} />
        ) : (
          <Box
            sx={{
              width: 230,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              borderRight: '1px solid #bdbdbd',
            }}
          >
            <ForumOutlinedIcon  sx={{ fontSize: 150 }} color="action" />
          </Box>
        )}
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <CardContent sx={{backgroundColor: '#fafafa', height: '100%'}}>
            <Stack direction={'row'} mb={3}  ml={3}>
              <Typography variant="subtitle2" component="div" sx={{color: 'text.secondary'}}>
                {dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}
              </Typography>
              <Typography variant="subtitle2" component="div" sx={{color: 'text.secondary', ml: 1}}>
                by {user}
              </Typography>
            </Stack>
            <Link component={RouterLink} to={`/posts/${id}`} variant="h6" noWrap ml={3}>
              {title}
            </Link>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default PostItem;