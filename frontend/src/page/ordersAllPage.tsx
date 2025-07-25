import OrdersFiltersComponent from '../components/ordersComponents/orderFilters.component';
import OrdersTableComponent from '../components/ordersComponents/ordersTable.component';
import PaginationComponent from '../components/ordersComponents/pagination.component';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { orderAction } from '../redux/slices/orderSlice';
import '../styles/styles.scss';
import { useSearchParams } from 'react-router-dom';
import { ListOrdersAllDto } from '../module/orders_dto/listOrdersAll.dto';

const OrdersAllPage = () => {
  const {dto} = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
      const query: ListOrdersAllDto = { ...dto };
      // створюємо копію, щоб поки не змінювати dto (потім зчитаємо та змінемо)
      const validKeys = Object.keys(query); // перевіряємо чи такий ключ існує

      searchParams.forEach((value, key) => {
        if (key === 'my') {
          query.my = value === 'true';
        } else if (['page', 'limit', 'alreadyPaid', 'age', 'sum'].includes(key)) {
          const num = Number(value);
          (query as any)[key] = !isNaN(num) ? num : null;
        } else if (validKeys.includes(key)) {
          (query as any)[key] = value || null;
        }
      }); // зчитуємо dto з url
    dispatch(orderAction.setDtoURL(query)); // оновлюємо dto в redux
    dispatch(orderAction.loadOrdersAll(query)); // запит, щоб оновити дані на сторінці
  }, [searchParams]); // для зчитування з url (url - redux - запит)

  useEffect(() => {
    const query: Record<string, string> = {};
    for (const key in dto) {
      const value = dto[key as keyof ListOrdersAllDto];
      //  дістаємо значення кожного поля (dto.name, dto.page і т.д.).
      if (value !== null && value !== undefined && value !== '') {
        query[key] = String(value);
      }
    }
    setSearchParams(query);
  }, [dto]);
  // для переходу по кнопкам(пагінація, фільтри),
  // йдемо в redux дістаємо там ключ - значення і оновлюємо url

  return(
    <div className={'divMainLayout__outlet__ordersAllPage'}>
      <OrdersFiltersComponent/>
      <OrdersTableComponent/>
      <PaginationComponent />
    </div>
  )
};

export default OrdersAllPage;