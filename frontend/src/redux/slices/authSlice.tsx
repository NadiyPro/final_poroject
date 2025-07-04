import { createSlice } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';
import { loadActivatePassword } from '../reducers/authLoad/loadActivatePassword';
import { initialStateAuth } from '../initialState/auth_initialState';

// interface AuthSliceInterface {
//   isValid: boolean;
//   isValidPassword: boolean;
//   dto: AuthLoginDto;
//   loadingLogin: boolean;
//   loadingPassword: boolean;
//   errorLogin: string | null;
//   errorPassword: string | null;
// }

// const initialState: AuthSliceInterface = {
//   isValid: false,
//   isValidPassword: false,
//   dto:{
//     email: '',
//     password: '',
//     deviceId: '',
//   },
//   loadingLogin: false,
//   loadingPassword: false,
//   errorLogin: null,
//   errorPassword: null
// };

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialStateAuth,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(
        loadLogin.fulfilled, (state, action) => {
          state.isValid = action.payload;
          state.loadingLogin = false;
          state.errorLogin = null;
        })
      .addCase(loadLogin.pending, (state) => {
        state.loadingLogin = true;
        state.errorLogin = null;
      })
      .addCase(loadLogin.rejected, (state, action) => {
        state.loadingLogin = false;
        state.errorLogin = 'Помилка, невірний email або пароль. Будь ласка, перевірте коректність введених даних.'
        console.error('Помилка, невірний email або пароль:', action.payload);
        }
      )
      .addCase(
        loadLogOut.fulfilled, (state) => {
          state.isValid = false;
        })
      .addCase(loadLogOut.rejected, (state, action) => {
          console.error('Помилка при виході користувача з платформи:', action.payload);
        }
      )
      .addCase(
        loadActivatePassword.fulfilled, (state, action) => {
          state.isValidPassword = action.payload;
          state.loadingPassword = false;
          state.errorPassword = null;
        })
      .addCase(loadActivatePassword.pending, (state) => {
        state.loadingPassword = true;
        state.errorPassword = null;
      })
      .addCase(loadActivatePassword.rejected, (state, action) => {
          state.loadingPassword = false;
          state.errorPassword = 'Помилка при введені паролю для реєстрації / зміни паролю. Будь ласка, перевірте чи збігаються password та confirm_password / термін дії посилання для реєстрації.'
          console.error('Помилка при введені паролю для реєстрації / зміни паролю:', action.payload);
        }
      )
  }
});

export const authAction = {
  ...authSlice.actions,
  loadLogin,
  loadLogOut,
  loadActivatePassword
}