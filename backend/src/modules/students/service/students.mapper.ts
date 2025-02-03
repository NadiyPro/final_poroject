import { ListUsersQueryReqDto } from '../../users/models/dto/req/list-users-query.req.dto';
import { StudentEntity } from '../../../infrastructure/mySQL/entities/student.entity';
import { BaseStudentResDto } from '../models/dto/res/base_students.res.dto';
import { ListStudentsResQueryDto } from '../models/dto/res/list-students-query.res.dto';

export class StudentsMapper {
  public static toResDto(student: StudentEntity): BaseStudentResDto {
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      phone: student.phone,
      age: student.age,
      course: student.course,
      course_format: student.course_format,
      course_type: student.course_type,
      status: student.status,
      sum: student.sum,
      alreadyPaid: student.alreadyPaid,
      created_at: student.created_at,
      user_id: student.user_id,
      message_id: student.message_id,
      deleted: student.deleted,
    };
  }

  public static toAllResDtoList(
    students: StudentEntity[],
    total: number,
    query: ListUsersQueryReqDto,
  ): ListStudentsResQueryDto {
    return {
      students: students.map((student) => this.toResDto(student)),
      total,
      ...query,
    };
  }
}
