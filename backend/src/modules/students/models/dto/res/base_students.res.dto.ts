export interface BaseStudentsResDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  status: string;
  sum: number;
  alreadyPaid: number;
  deleted: Date | null;
  created_at: Date;
  user_id: string;
  message_id: string;
}
