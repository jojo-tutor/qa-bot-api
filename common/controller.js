const getCommonController = (model) => {
  const getRecords = async () => {
    try {
      const result = await model.find();
      return { result };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  };

  const getRecord = async (id) => {
    try {
      const result = await model.findById(id);
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const createRecord = async (data) => {
    try {
      const createdRecord = await model.create(data);
      return await getRecord(createdRecord.id);
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const updateRecord = async (id, data) => {
    try {
      const updatedRecord = await model.findByIdAndUpdate(id, data, { new: true, runValidators: true }); // eslint-disable-line
      return await getRecord(updatedRecord.id);
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const deleteRecord = async (id) => {
    try {
      const result = await model.findByIdAndDelete(id);
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  return {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};

module.exports = getCommonController;
