import { Router } from 'express';
import multer from 'multer';

import UploadConfig from '@config/Upload';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const upload = multer(UploadConfig);

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
