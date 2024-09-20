import React, {useState} from 'react';
import {PostFields} from '../../../types';
import {Box, Stack, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (post: PostFields) => void;
  isLoading: boolean;
}

const PostForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [postData, setPostData] = useState<PostFields>({
    user: '',
    title: '',
    description: '',
    image: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!postData.description && !postData.image) {
      setErrorMessage('The field description or image or both should be filled.');
      return;
    }
    onSubmit({...postData});
    setPostData({
      user: '',
      title: '',
      description: '',
      image: '',
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={2}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter your title"
          id="title"
          name="title"
          value={postData.title}
          onChange={inputChangeHandler}
          required
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Description:</Typography>
        </Box>
        <TextField
          id="description"
          name="description"
          label="Enter your content"
          value={postData.description}
          onChange={inputChangeHandler}
          error={!!errorMessage && !postData.description && !postData.image}
          helperText={!!errorMessage && !postData.description && !postData.image ? 'Description or image is required' : ''}
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Image:</Typography>
        </Box>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
          error={!!errorMessage && !postData.image && !postData.description}
          helperText={!!errorMessage && !postData.image && !postData.description ? 'Description or image is required' : ''}
        />
      </Stack>
      <Stack direction="row" alignItems="center" mt={5}>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>create post</span>
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default PostForm;