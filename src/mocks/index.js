import category from './category';
import company from './company';
import question from './question';
import skill from './skill';
import user from './user';

const serviceList = {
  category,
  company,
  question,
  skill,
  user,
};

const create = async (req, res, next) => {
  try {
    const { services = [], count = 20 } = req.body;

    const createAll = services.map(async (key) => {
      if (serviceList[key]) {
        return {
          [key]: await serviceList[key].create(count),
        };
      }
      return {
        [key]: 'Service does not exist',
      };
    });

    const results = await Promise.all(createAll);

    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};

const del = async (req, res, next) => {
  try {
    const { services = [], count = 20 } = req.body;

    const deleteAll = services.map(async (key) => {
      if (serviceList[key]) {
        return {
          [key]: await serviceList[key].delete(count),
        };
      }
      return {
        [key]: 'Service does not exist',
      };
    });

    const results = await Promise.all(deleteAll);

    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  delete: del,
};
