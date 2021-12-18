const router = require('express').Router();

const { 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser ,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// setting up the route for getting all users and creating users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Setting up routes or by :id updating and deleting users.
router
    .route('/:username')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// route for adding a user to a friend list and removing a user from a friend list
router
    .route('/:username/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;