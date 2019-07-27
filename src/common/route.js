

const getCommonRoute = (router, controller, middlewares = []) => {
  const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  } = controller;

  router.get('/', middlewares, async (req, res, next) => {
    const { result, error } = await getRecords(req.query);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.get('/:id', middlewares, async (req, res, next) => {
    const { result, error } = await getRecord(req.params.id);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.post('/', middlewares, async (req, res, next) => {
    const { result, error } = await createRecord(req.body);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.put('/:id', middlewares, async (req, res, next) => {
    const { result, error } = await updateRecord(req.params.id, req.body);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  router.delete('/:id', middlewares, async (req, res, next) => {
    const { result, error } = await deleteRecord(req.params.id);
    if (error) {
      next(error);
    } else {
      res.status(200).json(result);
    }
  });

  return router;
};

export default getCommonRoute;
