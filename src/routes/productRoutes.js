const express=require('express');
const { create,findAll,findOne ,update,remove} = require('../controllers/productControllers');

const router=express.Router()
router.get("/",findAll)
router.get('/:id',findOne)
router.post('/',create);
router.put('/:id',update),
router.delete('/:id',remove)



module.exports=router;