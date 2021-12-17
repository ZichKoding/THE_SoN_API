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

// delete thought with route /<username>/:id
router.route('/:username/:id').delete(deleteThought);

module.exports = router;
