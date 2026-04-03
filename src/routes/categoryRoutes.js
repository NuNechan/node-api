const express = require('express');
const router = express.Router();
const { 
  findOne, 
  findAll, 
  create, 
  update, 
  remove 
} = require("../controllers/categoryControllers");
router.get('/', findAll);          // GET all categories
router.get('/:id', findOne);       // GET one category by ID
router.post('/', create);          // CREATE a new category
router.put('/:id', update);        // UPDATE a category by ID
router.delete('/:id', remove);     // DELETE a category by ID

module.exports = router;