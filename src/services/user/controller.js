import getCommonController from 'common/controller';
import { generateToken, hashPassword } from 'utils/tools';
import mailer from 'utils/mailer';
import TokenModel from 'services/token/model';
import TokenController from 'services/token/controller';
import CompanyModel from 'services/company/model';
import Model, { CompanyUser } from './model';

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    return Model.findById(id, '-password').populate('company');
  },

  async createRecord(data) {
    await new CompanyUser(data).validate();

    const company = await CompanyModel.findById(data.company);

    const result = await Model.create({
      email: data.email,
      company: data.company,
      role: 'Candidate',
      password: generateToken(), // dont worry, this will be set on email verification
    });

    // create token and send invite email
    const randomToken = generateToken();
    const { token } = await TokenModel.create({ token: randomToken, email: data.email });

    await mailer({
      to: data.email,
      subject: '[QA-Bot] Reset Your Password',
      data: {
        header: `You've been invited to ${company.name}. Let's reset your password.`,
        description: 'By clicking on the following link you are resetting your password.',
        button_label: 'Reset Password',
        button_link: `${process.env.PORTAL_HOST}/reset-password?token=${token}`,
      },
    });

    return result;
  },

  async changePassword(data) {
    // check required fields
    await new Model.Password(data).validate();

    // hash password
    const passwordHash = await hashPassword(data.password);

    // update user
    await Model.updateOne({ email: data.email }, { password: passwordHash }).orFail();
    const result = {
      updated: true,
      email: data.email,
    };

    return result;
  },

  async resetPassword(data) {
    // check required fields
    await new Model.Password(data).validate();

    // check token
    const result = await TokenController.validateToken(data.token);

    // hash password
    const passwordHash = await hashPassword(data.password);

    // update user
    await Model.updateOne({ email: result.email }, { password: passwordHash, status: 'Active' }).orFail();

    // update token
    await TokenController.updateRecord(result.id, { status: 'Expired' });

    return { updated: true };
  },
};

const controller = getCommonController(Model, customControllers);

export default controller;
