import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadOrdersStatisticAll } from '../reducers/adminLoad/loadOrdersStatisticAll';
import { loadOrdersStatisticManager } from '../reducers/adminLoad/loadOrdersStatisticManager';
import { loadUsersAll } from '../reducers/adminLoad/loadUsersAll';
import { loadActivateUser } from '../reducers/adminLoad/loadActivateUser';
import { loadBanUser } from '../reducers/adminLoad/loadBanUser';
import { loadUnbanUser } from '../reducers/adminLoad/loadUnbanUser';
import { loadGiveRole } from '../reducers/adminLoad/loadGiveRole';
import { TypeTextDto } from '../../module/typeText.dto';
import { initialStateAdmin } from '../initialState/admin_initialState';

// interface AdminSliceInterface {
//   ordersStatisticAll: OrdersStatisticAllDto,
//   ordersStatisticManager: OrdersStatisticManagerDto[],
//   dto: ListUsersQueryDto;
//   data:{
//     users: BaseUsersDto[],
//     total: number,
//   },
//   authTokens: AuthResDto;
//   userBanUnban: AuthUserDto;
//   giveRoleUser: BaseUsersDto,
//   statusGiveRole: TypeTextDto | null;
//   isGiveRoleModalOpen: boolean;
//   isActivateUser: TypeTextDto | null;
//   isBanUser: TypeTextDto | null;
//   isUnbanUser: TypeTextDto | null;
// }

// const initialState : AdminSliceInterface = {
//   ordersStatisticAll: {
//     total: 0,
//     In_work: 0,
//     New: 0,
//     Aggre: 0,
//     Disaggre: 0,
//     Dubbing: 0,
//   },
//   ordersStatisticManager: [{
//     manager: '',
//     total: 0,
//     In_work: 0,
//     New: 0,
//     Aggre: 0,
//     Disaggre: 0,
//     Dubbing: 0,
// }],
//   dto: {
//     limit: 10,
//     page: 1,
//   },
//   data:{
//     users: [],
//     total: 0
//   },
//   authTokens: {
//     tokens: {
//       accessToken:	'',
//       refreshToken: '',
//     },
//     user: {
//       id: '',
//       name: '',
//       surname: '',
//       email: '',
//       is_active: false,
//       role: RoleTypeEnum.ADMIN,
//     }
//   },
//   userBanUnban: {
//     id: '',
//     name: '',
//     surname: '',
//     email: '',
//     is_active: false,
//     role: RoleTypeEnum.ADMIN,
//   },
//   giveRoleUser: {
//     id: '',
//     name: '',
//     surname: '',
//     email: '',
//     is_active: false,
//     role: RoleTypeEnum.MANAGER,
//     deleted: null
//   },
//   statusGiveRole: null,
//   isGiveRoleModalOpen: false,
//   isActivateUser: null,
//   isBanUser: null,
//   isUnbanUser: null,
// };

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: initialStateAdmin,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
    setStatusGiveRole(state, action: PayloadAction<TypeTextDto | null>) {
      state.statusGiveRole = action.payload;
    },
    setOpenGiveRoleModal(state) {
      state.isGiveRoleModalOpen = true;
    },
    setCloseGiveRoleModal(state) {
      state.isGiveRoleModalOpen = false;
    },
    setIsActivateUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isActivateUser = action.payload;
    },
    setIsBanUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isBanUser = action.payload;
    },
    setIsUnbanUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isUnbanUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersStatisticAll.fulfilled, (state, action) => {
          state.ordersStatisticAll = action.payload;
        }
      )
      .addCase(loadOrdersStatisticAll.rejected, (state, action) => {
        console.error('Помилка завантаження загальної статистики по заявкам:', action.payload);
      }
      )
      .addCase(
        loadUsersAll.fulfilled, (state, action) => {
          state.data.users = action.payload.users;
          state.data.total = action.payload.total;
        }
      )
      .addCase(loadUsersAll.rejected, (state, action) => {
          console.error('Помилка завантаження списку користувачів:', action.payload);
        }
      )
      .addCase(loadOrdersStatisticManager.fulfilled, (state, action) => {
        state.ordersStatisticManager = action.payload;
      })

      .addCase(loadOrdersStatisticManager.rejected, (state, action) => {
          console.error('Помилка завантаження статистики по менеджеру:', action.payload);
        }
      )
      .addCase(
        loadActivateUser.fulfilled, (state, action) => {
          state.authTokens.tokens.accessToken = action.payload.tokens.accessToken;
          state.authTokens.tokens.refreshToken = action.payload.tokens.refreshToken;
          state.authTokens.user = action.payload.user;
        }
      )
      .addCase(loadActivateUser.rejected, (state, action) => {
          console.error('Помилка активації користувача:', action.payload);
        }
      )
      .addCase(
        loadBanUser.fulfilled, (state, action) => {
          state.userBanUnban = action.payload;
        }
      )
      .addCase(loadBanUser.rejected, (state, action) => {
          console.error('Помилка блокування користувача:', action.payload);
        }
      )
      .addCase(
        loadUnbanUser.fulfilled, (state, action) => {
          state.userBanUnban = action.payload;
        }
      )
      .addCase(loadUnbanUser.rejected, (state, action) => {
          console.error('Помилка розблокування користувача:', action.payload);
        }
      )
      .addCase(
        loadGiveRole.fulfilled, (state, action) => {
          state.giveRoleUser = action.payload;
          // state.isGiveRoleModalOpen = false;
        }
      )
      .addCase(loadGiveRole.rejected, (state, action) => {
          console.error('Помилка при видачі ролі новому користувачу:', action.payload);
        }
      )
  }
})

export const adminAction = {
  ...adminSlice.actions,
  loadOrdersStatisticAll,
  loadUsersAll,
  loadOrdersStatisticManager,
  loadActivateUser,
  loadBanUser,
  loadUnbanUser,
  loadGiveRole
}