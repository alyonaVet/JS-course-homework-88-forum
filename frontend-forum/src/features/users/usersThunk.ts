import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginCredentials, RegisterCredentials, User, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {unsetUser} from './usersSlice';

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

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {headers: {Authorization: `Bearer ${token}`}});
    dispatch(unsetUser());
  }
  );