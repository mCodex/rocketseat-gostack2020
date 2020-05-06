import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}
