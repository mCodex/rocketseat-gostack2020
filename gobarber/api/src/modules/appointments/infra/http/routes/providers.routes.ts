import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../../controllers/ProviderController';
import ProviderMonthAvailabilityController from '../../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const providersController = new ProviderController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index,
);

export default providersRouter;
