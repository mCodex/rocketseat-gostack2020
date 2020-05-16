import { container } from 'tsyringe';

import mailConfig from '@config/Mail';
import IMailProvider from './models/IMailProvider';

import EtherealProvider from './implementations/EtherealMailProvider';
import SESProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealProvider),
  ses: container.resolve(SESProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
