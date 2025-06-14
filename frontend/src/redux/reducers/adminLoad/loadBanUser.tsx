import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';
import { adminAction } from '../../slices/adminSlice';

const loadBanUser = createAsyncThunk(
  'loadBanUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.banUser(managerId);
      thunkAPI.dispatch(adminAction.setIsBanUser({ text: 'Користувача заблоковано', type: 'success' }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsBanUser(null));
      }, 7000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(adminAction.setIsBanUser({ text: 'Помилка. Перевірте права доступу (доступ лише для ролі admin)', type: 'error' }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsBanUser(null));
      }, 7000)
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadBanUser
}