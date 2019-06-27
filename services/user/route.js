const express = require('express');

const router = express.Router();

let data = [
  {
    id: '1',
    question: 'user 1',
  },
  {
    id: '2',
    question: 'user 2',
  },
  {
    id: '3',
    question: 'user 3',
  },
  {
    id: '4',
    question: 'user 4',
  },
];

router.get('/', (req, res) => {
  res.status(200).json(data);
});

router.post('/', (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    question: req.body.question,
  };
  data.push(newItem);
  res.status(200).json(newItem);
});

router.get('/:id', (req, res) => {
  const item = data.find(e => e.id === req.params.id) || {};
  res.status(200).json(item);
});

router.put('/:id', (req, res) => {
  let updatedItem = {};
  data = data.map((e) => {
    if (e.id === req.params.id) {
      updatedItem = {
        id: req.params.id,
        question: req.body.question,
      };
      return updatedItem;
    }
    return e;
  });
  res.status(200).json(updatedItem);
});

router.delete('/:id', (req, res) => {
  const deletedItem = data.find(e => e.id === req.params.id) || {};
  data = data.filter(e => e.id !== req.params.id);
  res.status(200).send(deletedItem);
});

module.exports = router;
