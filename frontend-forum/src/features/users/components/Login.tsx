import React, {ChangeEvent, useState} from 'react';
import {LoginCredentials} from '../../../types';
import {Alert, Avatar, Box, Button, Container, Link, TextField, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectLoginError} from '../usersSlice';
import {login} from '../usersThunk';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(loginData)).unwrap();
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={submitFormHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          mt: 5,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, backgroundColor: '#448aff'}}>
          <LockOpenIcon/>
        </Avatar>
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{width: '100%'}}>
            {error.error}
          </Alert>
        )}
        <TextField
          required
          label="Username"
          name="username"
          autoComplete="new-username"
          value={loginData.username}
          onChange={inputChangeHandler}
          fullWidth
        />

        <TextField
          required
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={loginData.password}
          onChange={inputChangeHandler}
          fullWidth
        />

        <Button type="submit" variant="contained" sx={{mt: 2, backgroundColor: '#448aff'}} fullWidth>
          Sign in
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          Do not have an account?{' '}
          <Link component={RouterLink} to={'/register'}  variant="body2">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;