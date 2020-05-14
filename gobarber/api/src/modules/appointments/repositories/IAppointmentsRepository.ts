import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByAllInMonthFromProviderDTO from '../dtos/IFindByAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindByAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
