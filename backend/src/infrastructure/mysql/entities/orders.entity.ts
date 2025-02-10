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
    unique: true,
    default: 'student@gmail.com',
  })
  email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true }) // додано для відповідності дампу
  utm: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true }) // додано для відповідності дампу
  msg: string | null;

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status: StatusEnum | null;

  // managerSurname, managerId - тут я буду витягувати юзера який взяв заявку в роботу ПІБ manager та його id
  // manager - по цьому полю вяжу табл, тобто підєдную повністю табл UserEntity до поточної StudentEntity
  // @Column({ type: 'uuid', nullable: true })
  // managerId: string | null;
  // @Column({ nullable: true })
  // manager: string | null;
  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'manager' })
  manager?: UserEntity | null;

  @OneToMany(() => MessageEntity, (message) => message.order)
  messages?: MessageEntity[] | null;

  // @Column({ type: 'varchar', nullable: true })
  // group: string | null;
  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'group' })
  group?: GroupEntity | null;
}
