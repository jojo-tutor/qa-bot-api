const express = require('express');

const router = express.Router();
const model = require('./model');

router.get('/', async (req, res) => {
  try {
    const records = await model.find();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const record = await model.findById(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const createdRecord = await model.create(req.body);
    res.status(200).json(createdRecord);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await model.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedRecord);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
});

module.exports = router;
