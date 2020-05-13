import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it("should be able to show user's profile", async () => {
    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    const userProfile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('User X');
    expect(userProfile.email).toBe('myuser@test.com');
  });

  it("should not be able to show user's profile that does not exist", async () => {
    await expect(
      showProfileService.execute({
        user_id: '1231a',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
