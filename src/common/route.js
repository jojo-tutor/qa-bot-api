

const getCommonRoute = (router, controller, middlewares = []) => {
  const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  } = controller;

  router.get('/', middlewares, async (req, res, next) => {
    const result = await getRecords(req.query).catch(next);
    res.status(200).json(result);
  });

  router.get('/:id', middlewares, async (req, res, next) => {
    const result = await getRecord(req.params.id).catch(next);
    res.status(200).json(result);
  });

  router.post('/', middlewares, async (req, res, next) => {
    const result = await createRecord(req.body).catch(next);
    res.status(200).json(result);
  });

  router.put('/:id', middlewares, async (req, res, next) => {
    const result = await updateRecord(req.params.id, req.body).catch(next);
    res.status(200).json(result);
  });

  router.delete('/:id', middlewares, async (req, res, next) => {
    const result = await deleteRecord(req.params.id).catch(next);
    res.status(200).json(result);
  });

  return router;
};

export default getCommonRoute;
