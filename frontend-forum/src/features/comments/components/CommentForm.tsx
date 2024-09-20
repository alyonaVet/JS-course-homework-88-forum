import React, {ChangeEvent, useState} from 'react';
import {Paper, Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {CommentFields} from '../../../types';
import {useParams} from 'react-router-dom';

interface Props {
  onSubmit: (comment: CommentFields) => void;
  isLoading: boolean;
}

const AddCommentForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const {id} = useParams() as { id: string };

  const [commentData, setCommentData] = useState<CommentFields>({
    post: id,
    content: '',
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCommentData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...commentData});

    setCommentData({
      post: id,
      content: '',
    });
  };

  return (
    <Paper sx={{p: 2, mt: 2}} elevation={3}>
      <Typography variant="h4" mb={1}>
        Add comment
      </Typography>
      <Stack spacing={2} component="form" onSubmit={onFormSubmit} alignItems={'start'}>
        <TextField
          label="Enter your comment"
          id="content"
          name="content"
          value={commentData.content}
          onChange={onFieldChange}
          fullWidth
        />
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          Save
        </LoadingButton>
      </Stack>
    </Paper>
  );
};

export default AddCommentForm;