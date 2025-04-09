import { EmailTypeEnum } from '../enums/email.enum';

export const emailConstants = {
  [EmailTypeEnum.ACTIVE]: {
    subject: 'Registration',
    template: 'active',
  },
};
