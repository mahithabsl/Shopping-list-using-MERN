const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//  api/items
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json('Error in finding' + err));
});

// post api
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

router.route('/:id').delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted'))
    .catch((err) => console.log('Error in deleting ' + err));
});

module.exports = router;
