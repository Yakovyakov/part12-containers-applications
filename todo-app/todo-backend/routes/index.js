const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});
router.get('/statistics', async (req, res) => {
  const count = await getAsync('todos_added');
  if (count) {
    res.send({
      'todos_added': parseInt(count)
    })
  } else {
    await setAsync('todos_added', 0);
    res.send({
      'todos_added': 0
    })
  }
})

module.exports = router;
