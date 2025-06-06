import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';

export class BaseOrdersReqDto {
  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name?: string | null;

  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname?: string | null;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 100)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string | null;

  @ApiProperty({ example: '380123456789' })
  @IsString()
  @Length(12)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Matches(/^380\d{9}$/)
  phone?: string | null;

  @ApiProperty({ example: 30 })
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  age?: number | null;

  @Length(2, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseEnum, {
    message: 'Курс повинен бути один з: FS, QACX, JCX, JSCX, FE, PCX',
  })
  course?: CourseEnum | null;

  @Length(5, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseFormatEnum, {
    message: 'course_format повинен бути один з: static, online',
  })
  course_format?: CourseFormatEnum | null;

  @Length(3, 100)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseTypeEnum, {
    message:
      'course_type повинен бути один з: pro, minimal, premium, incubator, vip',
  })
  course_type?: CourseTypeEnum | null;

  @ApiProperty({ example: 100000 })
  @Type(() => Number)
  @IsInt()
  sum?: number | null;

  @ApiProperty({ example: 100000 })
  @Type(() => Number)
  @IsInt()
  alreadyPaid?: number | null;

  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(StatusEnum, {
    message:
      'status повинен бути один з: In_work, New, Aggre, Disaggre, Dubbing ',
  })
  status?: StatusEnum | null;
}
