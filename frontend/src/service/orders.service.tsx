import { retrieveLocalStorage } from './retrieveLocalStorage';
import { axiosInstance } from './auth.service';
import { ListOrdersAllDto } from '../module/orders_dto/listOrdersAll.dto';
import { ListOrdersExelDto } from '../module/orders_dto/listOrdersExel.dto';
import { ListOrdersTotalDto } from '../module/orders_dto/listOrdersTotal.dto';
import { MessageResDto } from '../module/orders_dto/messageRes.dto';
import { CreateMessageDto } from '../module/orders_dto/createMessage.dto';
import { BaseOrdersDto } from '../module/orders_dto/baseOrders.dto';
import { UpdateOrdersReqDto } from '../module/orders_dto/updateOrdersReq.dto';
import { UpdateOrdersResDto } from '../module/orders_dto/updateOrdersRes.dto';
import { Group_nameDto } from '../module/orders_dto/group_name.dto';
import { GroupResDto } from '../module/orders_dto/groupRes.dto';
import { GroupOrdersDto } from '../module/orders_dto/groupOrders.dto';
import { AuthResDto } from '../module/auth_dto/authRes.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
  return request;
});

const orderService = {
  ordersAll: async (dto: Partial<ListOrdersAllDto>): Promise<ListOrdersTotalDto> => {
    const response = await axiosInstance.get('/orders', { params: dto });
      return response.data;
    },
  ordersExel: async (dto: Partial<ListOrdersExelDto>): Promise<void> => {
    const cleanedParams = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined && v !== null && v !== '')
    );

    const response = await axiosInstance.get('/orders/export', {
      params: cleanedParams,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },
  findOneOrder: async (orderId: number): Promise<BaseOrdersDto> => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  },
  messagesOrderId: async (orderId: number):Promise<MessageResDto[]> => {
    const response = await axiosInstance.get(`/message/${orderId}`);
    return response.data;
  },
  createMessage: async (orderId: number, dataMessage: CreateMessageDto): Promise<MessageResDto> => {
    const response = await axiosInstance.post(`/message/${orderId}`, dataMessage);
    return response.data;
  },
  editOrder: async ( orderId: number, updateOrdersReqDto: UpdateOrdersReqDto): Promise<UpdateOrdersResDto> => {
    const response = await axiosInstance.patch(`/orders/${orderId}`, updateOrdersReqDto);
    return response.data;
  },
  createGroup: async (group_name: Group_nameDto): Promise<GroupResDto> => {
    const response = await axiosInstance.post('/group', group_name);
    return response.data;
  },
  allGroup: async (): Promise<GroupResDto[] | null> => {
    const response = await axiosInstance.get('/group');
    console.log("service allGroup:", response.data);
    return response.data;
  },
  addGroup: async (orderId: string, group_id: string): Promise<GroupOrdersDto> => {
    const response = await axiosInstance.post(`/orders/${orderId}/${group_id}`);
    console.log('addGroup:', response.data)
    const {
      id,
      group_id: groupId,
      group_group_name,
    } = response.data;

    console.log('addGroup sort:', response.data)
    return {
      id,
      group_id: groupId,
      group_group_name,
    };
  }
}

export {
  orderService
}