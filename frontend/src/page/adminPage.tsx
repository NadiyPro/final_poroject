import OrdersStatisticAllComponent from '../components/adminComponents/ordersStatisticAll.component';
import OrdersStatisticManager from '../components/adminComponents/ordersStatisticManager.component';
import PaginationAdminComponent from '../components/adminComponents/paginationAdmin.component';
import GiveRoleComponent from '../components/adminComponents/giveRoleComponent';

const AdminPage = () => {

  return(
    <div className={'divMainLayout__outlet__adminPage'}>
      <OrdersStatisticAllComponent/>
      <GiveRoleComponent/>
      <OrdersStatisticManager />
      <PaginationAdminComponent/>
    </div>
  )
};

export default AdminPage;