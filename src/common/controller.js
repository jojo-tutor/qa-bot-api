const getCommonController = (Model, customControllers = {}) => {
  const getRecords = customControllers.getRecords || (async (query) => {
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

    return result;
  });

  const getRecord = customControllers.getRecord || (async id => Model.findById(id));

  const createRecord = customControllers.createRecord || (async (data) => {
    const createdRecord = await Model.create(data);
    return getRecord(createdRecord.id);
  });

  const updateRecord = customControllers.updateRecord || (async (id, data) => {
    const updatedRecord = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' }); // eslint-disable-line
    return getRecord(updatedRecord.id);
  });

  const deleteRecord = customControllers.deleteRecord || (async id => Model.findOneAndDelete({ _id: id })); // eslint-disable-line

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
