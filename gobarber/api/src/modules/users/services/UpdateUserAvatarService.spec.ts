import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it("should be able to update user's avatar", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: 'myAvatar.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('myAvatar.png');
  });

  it('should not be able to update an avatar of a user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        avatarFilename: 'myAvatar.png',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'myuser@test.com',
      name: 'User X',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      avatarFilename: 'myAvatar.png',
      user_id: user.id,
    });

    await updateUserAvatarService.execute({
      avatarFilename: 'myAvatar2.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('myAvatar.png');
    expect(user.avatar).toBe('myAvatar2.png');
  });
});
