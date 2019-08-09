import faker from 'faker'; // eslint-disable-line
import Model from 'services/user/model';

const fakerModel = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  role: faker.random.arrayElement(['Guest', 'Candidate', 'Company_Admin']),
  status: faker.random.arrayElement(['Active', 'Inactive', 'Unverified']),
  password: faker.internet.password(),
  email: faker.internet.email(),
});

const getItems = count => new Array(count).fill(true).map(fakerModel);

const create = async (count = 10) => {
  const items = getItems(count);
  return Model.create(items);
};

const del = async (count = 10) => {
  const findDocs = await Model.find({ role: { $ne: 'Super_Admin' } }, null, { limit: count });
  return Model.deleteMany({ _id: { $in: findDocs.map(e => e._id) } });
};

export default {
  create,
  delete: del,
};
