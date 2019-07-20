import faker from 'faker'; // eslint-disable-line
import Model from 'services/skill/model';

const fakerModel = () => ({
  name: faker.random.word(),
  description: faker.random.words(),
});

const getItems = count => new Array(count).fill(true).map(fakerModel);

const create = async (count = 10) => {
  const items = getItems(count);
  try {
    const result = await Model.create(items);
    return result;
  } catch (error) {
    return error.message;
  }
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
