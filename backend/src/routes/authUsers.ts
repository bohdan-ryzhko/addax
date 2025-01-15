import express from 'express';
import { routes } from '../constants';
import { authenticate, validateBody } from '../middlewares';
import { userRegistration, userLogin, userRefresh, userLogout, updateUser } from '../controllers';
import {
  validateRegistrationData,
  validateRefreshData,
  validateLoginData,
  validateUpdateuserInfoData,
} from '../schemas';

export const authUsersRouter = express.Router();

authUsersRouter
  .route(routes.auth.registration)
  .post(validateBody(validateRegistrationData), userRegistration);

authUsersRouter.route(routes.auth.login).post(validateBody(validateLoginData), userLogin);

authUsersRouter.route(routes.auth.refresh).post(validateBody(validateRefreshData), userRefresh);

authUsersRouter.route(routes.auth.logout).post(authenticate, userLogout);

authUsersRouter
  .route(routes.auth.updateInfo)
  .put(authenticate, validateBody(validateUpdateuserInfoData), updateUser);
