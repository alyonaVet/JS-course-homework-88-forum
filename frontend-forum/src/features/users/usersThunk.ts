import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginCredentials, RegisterCredentials, User, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<User, RegisterCredentials, { rejectValue: ValidationError }>(
  'users/register',
  async (registerCredentials, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<User>('/users', registerCredentials);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
         return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: GlobalError }>(
  'users/login',
  async (loginCredentials, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<User>('/users/sessions', loginCredentials);
      return user;

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);