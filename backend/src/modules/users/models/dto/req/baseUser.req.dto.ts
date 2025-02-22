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

// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
//
// @ValidatorConstraint({ name: 'isValidPassword', async: false })
// export class IsValidPassword implements ValidatorConstraintInterface {
//   validate(password: string) {
//     console.log('Validating password:', password);
//     return (
//       password === 'admin' ||
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/.test(
//         password,
//       )
//     );
//   }
//   defaultMessage() {
//     return 'Password must be at least 8 characters long, contain letters, a number, and a special character, or be "admin".';
//   }
// } //

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
  @Length(5, 300)
  @ValidateIf((dto: BaseUserReqDto) => dto.password !== 'admin') // Виконує перевірку тільки якщо пароль не "admin"
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsEnum(RoleTypeEnum, { message: 'role must be one of: admin, manager' })
  @Length(3, 50)
  role: RoleTypeEnum;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_active: boolean;
}
