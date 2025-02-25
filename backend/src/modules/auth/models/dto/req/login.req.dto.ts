import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { BaseUserReqDto } from '../../../../users/models/dto/req/baseUser.req.dto';

// export class LoginReqDto extends PickType(BaseAuthReqDto, [
//   'email',
//   'password',
//   'is_active',
//   'deviceId',
// ]) {}

export class LoginReqDto {
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

  @ApiProperty({ example: false })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: 'deviceId' })
  @IsNotEmpty()
  @IsString()
  deviceId: string;
}
