import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import orderValidator from '../../validator/order.validator';
import { UpdateOrdersReqDto } from '../../module/orders_dto/updateOrdersReq.dto';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { orderAction } from '../../redux/slices/orderSlice';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { StatusEnum } from '../../module/enums/statusEnum';
import { CourseEnum } from '../../module/enums/courseEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';
import { Group_nameDto } from '../../module/orders_dto/group_name.dto';
import group_nameValidator from '../../validator/group_name.validator';
import { useEffect } from 'react';
import '../../styles/styles.scss';

const EditOrderComponent = () => {
  const { handleSubmit, register, reset, watch} = useForm<UpdateOrdersReqDto>({
    mode: 'all',
    resolver: joiResolver(orderValidator)
  })
  const {
    handleSubmit: handleSubmitCreateGroup,
    register: registerCreateGroup,
    reset: resetCreateGroup,
    formState: { isValid: isValidCreateGroup }
  } = useForm<Group_nameDto>({ mode: 'all', resolver: joiResolver(group_nameValidator) })
  const {
    handleSubmit: handleSubmitAddGroup,
    register: registerAddGroup,
  } = useForm<{ group_group_name: string }>({ mode: 'all' })
  const { findOneOrder, isDefaultGroupState, isAddGroupState, isCreateGroup, allGroup, dto, isDuplicate, isGroupOrder, isNoGroup, isUpdateEditOrder} = useAppSelector((state) => state.orderStore)
  const dispatch = useAppDispatch();
  const watchFormEdit = watch();

  const isSomeValueEdit = Object.values(watchFormEdit).some(
    value => value !== undefined && value !== '' && value !== null
  );

  useEffect(() => {
    if (isAddGroupState || isDefaultGroupState) {
      dispatch(orderAction.loadAllGroup());
    }
  }, [dispatch, isAddGroupState, isDefaultGroupState]);

  const handleCloseEditOrder = () => {
    dispatch(orderAction.setOpenEditOrderModal(false));
    dispatch(orderAction.loadOrdersAll(dto));
  };

  const handleCreateGroupState = (group_name: Group_nameDto) => {
    const isDuplicateGroup = allGroup?.some(group => group.group_group_name === group_name.group_name);
    if (isDuplicateGroup) {
      dispatch(orderAction.setIsDuplicate(true));
      setTimeout(() => dispatch(orderAction.setIsDuplicate(false)), 3000);
      return;
    }

    dispatch(orderAction.loadCreateGroup(group_name))
      .then(() => {
        dispatch(orderAction.setCreateGroup(true));
        resetCreateGroup();
        setTimeout(() => {
          dispatch(orderAction.setCreateGroup(false));
          dispatch(orderAction.setDefaultGroupState(false)); //нов
          dispatch(orderAction.setAddGroupState(true));
        }, 3000);
      });
  };

  const handleAddGroup = (data: { group_group_name: string }) => {
    const group_group_name = data.group_group_name;

    const group = allGroup && allGroup.find(value => value.group_group_name === group_group_name);
    if (!group) {
      dispatch(orderAction.setIsNoGroup(true));
      setTimeout(() => dispatch(orderAction.setIsNoGroup(false)), 3000);
      return;
    }

    if (findOneOrder.id !== null) {
      dispatch(orderAction.loadAddGroup({
        orderId: findOneOrder.id.toString(),
        group_id: group.group_id.toString()
      })).unwrap()
    }

    setTimeout(() => {
      dispatch(orderAction.setAddGroupState(false));
      dispatch(orderAction.setDefaultGroupState(true));
    }, 4500);
  };

  const handleEditOrder = (updateOrdersReqDto: UpdateOrdersReqDto) => {
    const cleanedData = Object.fromEntries(
      Object.entries(updateOrdersReqDto).filter(([, value]) => value !== '' && value !== undefined)
    );

    if (findOneOrder.id !== null) {
      dispatch(orderAction.loadEditOrder({ orderId: findOneOrder.id, updateOrdersReqDto: cleanedData }));
    }

    reset();
  };

  return (
    <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit'}>
      <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent'}>
        { isDefaultGroupState && (
          <form className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__createGroup'} onSubmit={handleSubmitCreateGroup(handleCreateGroupState)}>
            <label htmlFor={'group_name'}><b>Group</b></label>
            <input id={'group_name'} type={'text'} {...registerCreateGroup('group_name')} placeholder={'Group'} />
            <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__createGroup__buttonBox'}>
              <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
                      type={'submit'} disabled={!isValidCreateGroup}>
                ADD
              </button>
              <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
                      type={'button'} onClick={() => dispatch(orderAction.setAddGroupState(true))}>
                SELECT
              </button>
            </div>
            { isDuplicate &&
              <div>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}
                   style={{margin: 0, color: '#6e0707'}}>
                  Помилка. Група з такою назвою вже існує
                </p>
              </div>}
            { isCreateGroup &&
              <div>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}
                   style={{margin: 0, color: '#1f615c'}}>
                  Група успішно створена
                </p>
              </div>}
          </form>
        )}
        { isAddGroupState && (
          <form className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__addGroup'}
                onSubmit={handleSubmitAddGroup(handleAddGroup)}>
            <label htmlFor={'addGroupSelect'}><b>Group</b></label>
            <select id={'addGroupSelect'} {...registerAddGroup('group_group_name')}>
              <option value="">Select group</option>
              {allGroup &&
                allGroup.map(group => (
                  <option key={group.group_id} value={group.group_group_name}>{group.group_group_name}</option>
                ))
              }
            </select>
            <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__createGroup__buttonBox'}>
              <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__createGroup__buttonBox__addGroup'} type={'submit'}>
                ADD GROUP
              </button>
              <button className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'} type={'button'} onClick={() => dispatch(orderAction.setAddGroupState(false))}>
                BACK
              </button>
            </div>
            { isNoGroup &&
              <div>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}
                   style={{margin: 0, color: '#6e0707'}}>
                  Даної групи не існує
                </p>
              </div>}
            { isGroupOrder &&
              <div>
                <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'}
                   style={{margin: 0, color: isGroupOrder.type === 'success' ? '#1f615c' : '#6e0707'}}>
                  {isGroupOrder.text}
                </p>
              </div>}
          </form>
        )}

        <form className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__editOrderForm'} onSubmit={handleSubmit(handleEditOrder)}>

          <div className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__editOrderForm__inputSelect'}>
            <label htmlFor={SortFieldEnum.NAME}><b>Name</b></label>
            <input id={SortFieldEnum.NAME} type={'text'} {...register(SortFieldEnum.NAME)} placeholder={'Name'} />

            <label htmlFor={SortFieldEnum.SURNAME}><b>Surname</b></label>
            <input type={'text'} {...register(SortFieldEnum.SURNAME)} placeholder={'Surname'} />

            <label htmlFor={SortFieldEnum.EMAIL}><b>Email</b></label>
            <input type={'email'} {...register(SortFieldEnum.EMAIL)} placeholder={'Email'} />

            <label htmlFor={SortFieldEnum.PHONE}><b>Phone</b></label>
            <input type={'text'} {...register(SortFieldEnum.PHONE)} placeholder={'Phone'} />

            <label htmlFor={SortFieldEnum.AGE}><b>Age</b></label>
            <input id={SortFieldEnum.AGE} type={'number'} {...register(SortFieldEnum.AGE)} placeholder={'Age'}
                   min={18} max={100} />

            <label htmlFor={SortFieldEnum.STATUS}><b>Status</b></label>
            <select {...register(SortFieldEnum.STATUS)}>
              <option value={''}>Status</option>
              <option value={StatusEnum.IN_WORK}>{StatusEnum.IN_WORK}</option>
              <option value={StatusEnum.NEW}>{StatusEnum.NEW}</option>
              <option value={StatusEnum.AGGRE}>{StatusEnum.AGGRE}</option>
              <option value={StatusEnum.DISAGGRE}>{StatusEnum.DISAGGRE}</option>
              <option value={StatusEnum.DUBBING}>{StatusEnum.DUBBING}</option>
            </select>

            <label htmlFor={SortFieldEnum.SUM}><b>Sum</b></label>
            <input type={'number'} {...register(SortFieldEnum.SUM)} placeholder={'Sum'} />

            <label htmlFor={SortFieldEnum.ALREADY_PAID}><b>Already paid</b></label>
            <input type={'number'} {...register(SortFieldEnum.ALREADY_PAID)} placeholder={'Already paid'} />

            <label htmlFor={SortFieldEnum.COURSE}><b>Course</b></label>
            <select {...register(SortFieldEnum.COURSE)}>
              <option value={''}>Course</option>
              <option value={CourseEnum.FS}>{CourseEnum.FS}</option>
              <option value={CourseEnum.QACX}>{CourseEnum.QACX}</option>
              <option value={CourseEnum.JCX}>{CourseEnum.JCX}</option>
              <option value={CourseEnum.JSCX}>{CourseEnum.JSCX}</option>
              <option value={CourseEnum.FE}>{CourseEnum.FE}</option>
              <option value={CourseEnum.PCX}>{CourseEnum.PCX}</option>
            </select>

            <label htmlFor={SortFieldEnum.COURSE_FORMAT}><b>Course format</b></label>
            <select {...register(SortFieldEnum.COURSE_FORMAT)}>
              <option value={''}>Course format</option>
              <option value={CourseFormatEnum.STATIC}>{CourseFormatEnum.STATIC}</option>
              <option value={CourseFormatEnum.ONLINE}>{CourseFormatEnum.ONLINE}</option>
            </select>

            <label htmlFor={SortFieldEnum.COURSE_TYPE}><b>Course type</b></label>
            <select {...register(SortFieldEnum.COURSE_TYPE)}>
              <option value={''}>Course type</option>
              <option value={CourseTypeEnum.PRO}>{CourseTypeEnum.PRO}</option>
              <option value={CourseTypeEnum.MINIMAL}>{CourseTypeEnum.MINIMAL}</option>
              <option value={CourseTypeEnum.PREMIUM}>{CourseTypeEnum.PREMIUM}</option>
              <option value={CourseTypeEnum.INCUBATOR}>{CourseTypeEnum.INCUBATOR}</option>
              <option value={CourseTypeEnum.VIP}>{CourseTypeEnum.VIP}</option>
            </select>
          </div>

          <div
            className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__baseEdit__colorEdit__editOrderComponent__createGroup__buttonBox'}>
            <button
              className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
              type={'submit'} disabled={!isSomeValueEdit}>
              SUBMIT
            </button>
            <button
              className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__button'}
              type={'button'} onClick={handleCloseEditOrder}>
              CLOSE
            </button>
          </div>
          {isUpdateEditOrder &&
            <div>
              <p className={'divMainLayout__outlet__ordersAllPage__ordersTableComponent__table__tbody__messagesOrderIdComponent__messages__data__managerDate__p'} style={{
                margin: 0,
                color: isUpdateEditOrder.type === 'success' ? '#1f615c' : '#6e0707'
              }}>{isUpdateEditOrder.text}</p>
            </div>}
        </form>
      </div>
    </div>
  )
}

export default EditOrderComponent;