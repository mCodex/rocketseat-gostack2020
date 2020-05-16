import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it("should be able to list provider's appointments in a specific day", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user_one',
      user_id: 'user_two',
      date: new Date(2020, 4, 10, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user_one',
      user_id: 'user_two',
      date: new Date(2020, 4, 10, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'user_one',
      year: 2020,
      month: 5,
      day: 10,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
