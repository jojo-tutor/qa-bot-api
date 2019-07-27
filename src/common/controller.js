const getCommonController = (Model, customControllers = {}) => {
  const getRecords = customControllers.getRecords || (async (query) => {
    try {
      const { limit = 10, skip = 0 } = query;
      const sort = query.sort ? JSON.parse(query.sort) : [];
      const options = {
        limit: parseInt(limit, 10),
        skip: parseInt(skip, 10),
      };
      const filters = {};
      const fields = '';
      const sortFields = sort.reduce((acc, { id, desc }) => ([...acc, [id, desc ? -1 : 1]]), []);

      const count = await Model.countDocuments();
      const list = await Model
        .find(filters, fields, options)
        .sort(sortFields);
      const result = {
        list,
        count,
        pages: Math.ceil(count / options.limit),
        ...options,
      };
      return { result };
    } catch (error) {
      return { error };
    }
  });

  const getRecord = customControllers.getRecord || (async (id) => {
    try {
      const result = await Model.findById(id);
      return { result };
    } catch (error) {
      return { error };
    }
  });

  const createRecord = customControllers.createRecord || (async (data) => {
    try {
      const createdRecord = await Model.create(data);
      return await getRecord(createdRecord.id);
    } catch (error) {
      return { error };
    }
  });

  const updateRecord = customControllers.updateRecord || (async (id, data) => {
    try {
      const updatedRecord = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' }); // eslint-disable-line
      return await getRecord(updatedRecord.id);
    } catch (error) {
      return { error };
    }
  });

  const deleteRecord = customControllers.deleteRecord || (async (id) => {
    try {
      const result = await Model.findByIdAndDelete(id);
      return { result };
    } catch (error) {
      return { error };
    }
  });

  return {
    ...customControllers,
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};

export default getCommonController;
