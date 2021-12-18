const { User } = require('../models/');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // get a single user
    getOneUser({ params }, res) {
        User.findOne({ username: params.username})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate( { username: params.username}, body, { new: true, runValidators: true } )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(404).json(err));
    },
    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ username: params.username })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id."});
                    return;
                }
            })
            .catch(err => res.status(400).json(err));
    },

    // add user to friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { username: params.username },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this username or id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a user from friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { username: params.username },
            { $pull: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this username or id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;