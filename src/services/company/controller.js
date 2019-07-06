const getCommonController = require('common/controller');
const UserModel = require('services/user/model');
const TokenModel = require('services/token/model');
const { hashPassword, generateToken } = require('utils/tools');
const mailer = require('utils/mailer');
const Model = require('./model');

// custom or override controller below
const customControllers = {
  async createRecord(data) {
    try {
      // validate user
      await new UserModel(data).validate();

      // create company
      const createdCompany = await Model.create(data);

      // crate user
      const passwordHash = await hashPassword(data.password);
      await UserModel.create({
        ...data, role: 'Admin', password: passwordHash, company: createdCompany.id,
      });

      // create token and send verification email
      const randomToken = generateToken();
      const { token } = await TokenModel.create({ token: randomToken, email: data.email });
      await mailer({ to: data.email, token });

      const result = await Model.findById(createdCompany.id);
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
