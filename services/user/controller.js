const bcrypt = require('bcrypt');
const Model = require('./model');
const getCommonController = require('../../common/controller');

// custom or override controller below
const customControllers = {
  async getRecord(id) {
    try {
      const result = await Model.findById(id).populate('company');
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  async login(data) {
    try {
      // check required fields
      const password = new Model.Password(data);
      await password.validate();

      // get user
      const user = await Model.findOne({ email: data.email });

      // compare passwords
      const result = await bcrypt
        .compare(data.password, user.password)
        .then((valid) => {
          if (!valid) {
            throw new Error('Invalid email or password');
          }
          return valid;
        });
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  async changePassword(data) {
    try {
      // check required fields
      const password = new Model.Password(data);
      await password.validate();

      // hash password
      const passwordHash = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS, 10));

      // update user
      await Model.updateOne({ email: data.email }, { password: passwordHash }).orFail();
      const result = {
        updated: true,
        email: data.email,
      };
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
