import UserModel from 'services/user/model';
import mainController from 'services/main/controller';
import logger from 'utils/logger';

const setup = async () => {
  const user = await UserModel.findOne({ role: 'Super_Admin' });
  const source = 'user-setup';

  if (user) {
    logger.info(`Super Admin is already present. Existing email: ${user.email}`, source);
  } else {
    // if no super admin, create one thru signup
    const data = {
      email: process.env.SUPER_USER_EMAIL,
      password: process.env.SUPER_USER_PASSWORD,
    };
    const { error } = await mainController.signup(data, { role: 'Super_Admin' });

    if (error) {
      logger.error(error.message, source);
    } else {
      logger.info(`Super Admin successfully created! Confirmation email sent to: ${data.email}`, source);
    }
  }
};

module.exports = setup;
