const router = require('express').Router();
const { 
    getAllThoughts, 
    getOneThought, 
    createThought, 
    updateThought, 
    deleteThought 
} = require('../../controllers/thought-controller');

// get all and create routes
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// get by id, update, and delete
router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;
