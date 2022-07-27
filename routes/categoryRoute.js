const router = require('express').Router()
const categoryCtrl = require('../controller/category')
 
router.route('/')
    .get(categoryCtrl.getCategories)
    .post(  categoryCtrl.createCategory)

router.route('/:id')
    .delete( categoryCtrl.deleteCategory)
    .put( categoryCtrl.updateCategory)
router.delete("/delete",categoryCtrl.deleteCategory)

module.exports = router