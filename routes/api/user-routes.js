const router = require('express').Router();

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');

// setting up the route for getting all users and creating users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Setting up routes or by :id updating and deleting users.
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;