import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

import { RoleTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/roleType.enum';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseUserReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name: string;

  @IsString()
  @Length(3, 50)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @Length(0, 300)
  @ValidateIf((o: { password: string }) => o.password !== 'admin')
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsEnum(RoleTypeEnum, { message: 'role must be one of: admin, manager' })
  @Length(3, 50)
  role: RoleTypeEnum;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_active: boolean;
}
