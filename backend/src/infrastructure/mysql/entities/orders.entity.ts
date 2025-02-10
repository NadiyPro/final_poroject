import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CourseEnum } from './enums/course.enum';
import { CourseFormatEnum } from './enums/courseFormat.enum';
import { CourseTypeEnum } from './enums/courseType.enum';
import { StatusEnum } from './enums/status.enum';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';
import { GroupEntity } from './group.entity';

@Index(['name'])
@Entity(TableNameEnum.ORDERS)
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 25, nullable: true })
  surname: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: 'student@gmail.com',
  })
  email: string | null;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string | null;

  @Column({ type: 'integer', nullable: true })
  age: number | null;

  @Column({ type: 'enum', enum: CourseEnum, nullable: true })
  course: CourseEnum | null;

  @Column({
    type: 'enum',
    enum: CourseFormatEnum,
    nullable: true,
  })
  course_format: CourseFormatEnum | null;

  @Column({ type: 'enum', enum: CourseTypeEnum, nullable: true })
  course_type: CourseTypeEnum | null;

  @Column({ type: 'integer', nullable: true })
  sum: number | null;

  @Column({ type: 'integer', nullable: true })
  alreadyPaid: number | null;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true }) // для завантаження дамп
  utm: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true }) // для завантаження дамп
  msg: string | null;

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status: StatusEnum | null;

  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'manager' })
  manager: UserEntity | null;

  @OneToMany(() => MessageEntity, (message) => message.order)
  messages?: MessageEntity[] | null;

  // @Column({ type: 'varchar', nullable: true })
  // group: string | null;
  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'group' })
  group?: GroupEntity | null;
}
