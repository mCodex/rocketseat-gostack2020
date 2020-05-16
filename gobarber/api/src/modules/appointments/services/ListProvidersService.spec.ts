import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    await fakeUsersRepository.create({
      email: 'myuser2@test.com',
      name: 'User 2',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'myuser3@test.com',
      name: 'User 2',
      password: '123456',
    });

    await fakeUsersRepository.create({
      email: 'johnny@test.com',
      name: 'User 2',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toHaveLength(3);
  });
});
