import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';

import { RoleTypeEnum } from './enums/roleType.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CreateUpdateModel } from './models/date.model';
import { OrdersEntity } from './orders.entity';
import { MessageEntity } from './message.entity';

@Index(['name'])
@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 25, nullable: true })
  surname: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', default: RoleTypeEnum.ADMIN, enum: RoleTypeEnum })
  role: RoleTypeEnum;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deleted: Date | null;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[] | null;

  @OneToMany(() => OrdersEntity, (entity) => entity.manager)
  orders?: OrdersEntity[] | null;

  @OneToMany(() => MessageEntity, (entity) => entity.manager)
  messages?: MessageEntity[] | null;
}
