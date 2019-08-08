import getCommonController from 'common/controller';
import UserModel from 'services/user/model';
import TokenModel from 'services/token/model';
import { hashPassword, generateToken } from 'utils/tools';
import mailer from 'utils/mailer';
import Model from './model';

// custom or override controller below
const customControllers = {
  async createRecord(data) {
    await new UserModel(data).validate();

    // create company
    const createdCompany = await Model.create(data);

    // crate user
    const passwordHash = await hashPassword(data.password);
    await UserModel.create({
      ...data, role: 'Company_Admin', password: passwordHash, company: createdCompany.id,
    });

    // create token and send verification email
    const randomToken = generateToken();
    const { token } = await TokenModel.create({ token: randomToken, email: data.email });

    await mailer({
      to: data.email,
      subject: 'Welcome to QA-Bot! Confirm Your Email',
      data: {
        header: 'You\'re on your way. Let\'s confirm your email address.',
        description: 'By clicking on the following link you are confirming your email address.',
        button_label: 'Confirm Email Address',
        button_link: `${process.env.PORTAL_HOST}/signup/validate?token=${token}`,
      },
    });

    return Model.findById(createdCompany.id);
  },
};

const controller = getCommonController(Model, customControllers);

export default controller;
