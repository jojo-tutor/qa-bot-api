const getCommonController = (Model, customControllers = {}) => {
  const getRecords = customControllers.getRecords || (async (query) => {
    const { limit = 10, skip = 0 } = query;
    const options = {
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
    };
    const filters = {};
    const fields = '';
    try {
      const count = await Model.count();
      const list = await Model.find(filters, fields, options);
      const result = {
        list,
        count,
        ...options,
      };
      return { result };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  });

  const getRecord = customControllers.getRecord || (async (id) => {
    try {
      const result = await Model.findById(id);
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  });

  const createRecord = customControllers.createRecord || (async (data) => {
    try {
      const createdRecord = await Model.create(data);
      return await getRecord(createdRecord.id);
    } catch (error) {
      console.error(error);
      return { error };
    }
  });

  const updateRecord = customControllers.updateRecord || (async (id, data) => {
    try {
      const updatedRecord = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true }); // eslint-disable-line
      return await getRecord(updatedRecord.id);
    } catch (error) {
      console.error(error);
      return { error };
    }
  });

  const deleteRecord = customControllers.deleteRecord || (async (id) => {
    try {
      const result = await Model.findByIdAndDelete(id);
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  });

  return {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};

module.exports = getCommonController;
