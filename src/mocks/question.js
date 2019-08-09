import faker from 'faker'; // eslint-disable-line
import Model from 'services/question/model';

const fakerModel = () => ({
  description: faker.random.word(),
  question: faker.random.words(),
  answer: faker.random.words(),
});

const getItems = count => new Array(count).fill(true).map(fakerModel);

const create = async (count = 10) => {
  const items = getItems(count);
  return Model.create(items);
};

const del = async (count = 10) => {
  const findDocs = await Model.find({}, '_id', { limit: count });
  return Model.deleteMany({ _id: { $in: findDocs.map(e => e._id) } });
};

export default {
  create,
  delete: del,
};
