import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByAllInMonthFromProviderDTO from '../dtos/IFindByAllInMonthFromProviderDTO';
import IFindByAllInDayFromProviderDTO from '../dtos/IFindByAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindByAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindByAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
