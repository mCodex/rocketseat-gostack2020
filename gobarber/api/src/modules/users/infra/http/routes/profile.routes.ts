import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const forgotPasswordController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', forgotPasswordController.show);

profileRouter.put('/', forgotPasswordController.update);

export default profileRouter;
