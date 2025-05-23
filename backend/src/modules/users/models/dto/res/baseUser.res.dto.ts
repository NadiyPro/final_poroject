import { RoleTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/roleType.enum';

export class BaseResDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: RoleTypeEnum;
  deleted: Date | null;
}
