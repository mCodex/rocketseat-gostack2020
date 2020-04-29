import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor(data: Omit<Appointment, 'id'>) {
    const { provider, date } = data;
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
