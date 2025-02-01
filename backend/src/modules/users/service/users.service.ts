import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { RoleTypeEnum } from '../enums/RoleType.enum';
import { UserEntity } from '../../../infrastructure/mySQL/entities/user.entity';
import { GiveRoleDto } from '../models/dto/req/give_role.dto';

@Injectable()
export class UsersService {
  constructor(
    // private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async giveRole(giveRoleDto: GiveRoleDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...giveRoleDto,
      role: RoleTypeEnum.MANAGER,
      is_active: false,
    });
    return await this.userRepository.save(user);
  }

  // public async findAll(
  //   query: ListUsersQueryReqDto,
  // ): Promise<[UserEntity[], number]> {
  //   return await this.userRepository.findAll(query);
  // }
  //
  // public async OrdersStatistic(
  // ): Promise<StudentEntity> {
  //   return await this.studentRepository.findStatus(query);
  // }
  //
  // public async deleteId(userId: string): Promise<string> {
  //   await this.userRepository.update({ id: userId }, { deleted: new Date() });
  //   await this.refreshTokenRepository.delete({ user_id: userId });
  //   return 'The user in the table (db) has been successfully marked as deleted';
  // }
}
