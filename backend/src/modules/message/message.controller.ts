import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { StudentOwnershipGuard } from '../guards/statuseStudents.guard';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { Role } from '../guards/decorator/role.decorator';
import { BaseMessageResDto } from './models/dto/res/baseMessage.res.dto';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from './models/dto/req/baseMessage.req.dto';

@ApiTags(TableNameEnum.MESSAGE)
@Controller(TableNameEnum.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    summary:
      'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId',
    description:
      'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get(':studentId')
  public async findId(
    @Param('studentId') studentId: string,
  ): Promise<BaseMessageResDto[]> {
    return await this.messageService.findId(studentId);
  }

  @ApiOperation({ summary: '', description: '' })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, StudentOwnershipGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Post(':studentId')
  public async createMessage(
    @CurrentUser() userData: IUserData,
    @Param('studentId') studentId: string,
    @Body() dataMessage: BaseMessageReqDto,
  ): Promise<BaseMessageResDto> {
    return await this.messageService.createMessage(
      userData,
      studentId,
      dataMessage,
    );
  }
}
