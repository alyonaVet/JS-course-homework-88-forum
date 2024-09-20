import React from 'react';
import {Paper, Stack, Typography} from '@mui/material';

export interface Props {
  user: string;
  content: string;
}

const OneComment: React.FC<Props> = ({user, content}) => {
  return (
    <Paper sx={{ p:1, mt:2 }} elevation={3}>
      <Stack direction={'row'} gap={2}>
        <Typography>{user}:</Typography>
        <Typography sx={{flexGrow: 1}}>{content}</Typography>
      </Stack>
    </Paper>
  );
};

export default OneComment;