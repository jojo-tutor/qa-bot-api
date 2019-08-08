import faker from 'faker'; // eslint-disable-line
import Model from 'services/company/model';

const fakerModel = () => ({
  name: faker.company.companyName(),
  email: faker.internet.email(),
});

const getItems = count => new Array(count).fill(true).map(fakerModel);

const create = async (count = 10) => {
  const items = getItems(count);
  return Model.create(items);
};

const del = async (count = 10) => {
  const findDocs = await Model.find({}, '_id', { limit: count });
  const deleteDocs = await Model.deleteMany({ _id: { $in: findDocs.map(e => e._id) } });

  return deleteDocs;
};

export default {
  create,
  delete: del,
};
