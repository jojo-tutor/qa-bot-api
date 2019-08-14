import express from 'express';

import controller from './controller';

const router = express.Router();

// custom or route below

router.get('/validate', async (req, res, next) => {
  try {
    const result = await controller.validateToken(req.query.token);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

const route = router;

export default route;
