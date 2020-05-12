import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to update user's avatar", async () => {
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
    await expect(
      updateUserAvatarService.execute({
        avatarFilename: 'myAvatar.png',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
