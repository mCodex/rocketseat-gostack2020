import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update user's profile", async () => {
    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'User Y',
      email: 'myuser2@test.com',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('User Y');
    expect(updatedUser.email).toBe('myuser2@test.com');
  });

  it('should not be able to change the email to another user email', async () => {
    await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      email: 'myuser2@test.com',
      name: 'User XPTO',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'User Y',
        email: 'myuser@test.com',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'User Y',
      email: 'myuser2@test.com',
      user_id: user.id,
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'User Y',
        email: 'myuser2@test.com',
        user_id: user.id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'User Y',
        email: 'myuser2@test.com',
        user_id: user.id,
        password: '123123',
        old_password: '1234561212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
