const getCommonRoute = (router, controller) => {
  const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  } = controller;

  router.get('/', async (req, res, next) => {
    const { result, error } = await getRecords(req.query);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { result, error } = await getRecord(req.params.id);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.post('/', async (req, res, next) => {
    const { result, error } = await createRecord(req.body);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { result, error } = await updateRecord(req.params.id, req.body);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const { result, error } = await deleteRecord(req.params.id);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  return router;
};

module.exports = getCommonRoute;
