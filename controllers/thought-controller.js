const { Thought, User } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // get one thought
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // create a Thought
    createThought({ body }, res) {
        User.findOne({ username: body.username})
        .then(dbUserData => {
            if (!dbUserData._id) {
                res.status(404).json({ message: "No user found with that username" });
                return;
            }
            res.json(dbUserData.username);

            Thought.create(body)
            .then(({ username, _id }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $push: { thoughts: _id }},
                    { new: true, runValidators: true },
                )

            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },
    // update a thought
    updateThought({ params, body }, res) {
        User.findOne({ username: body.username})
        .then(dbUserData => {
            if (!dbUserData._id) {
                res.status(404).json({ message: "No user found with that username" });
                return;
            }
            res.json(dbUserData.username);

            Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
                )
                .then(({ username, _id }) => {
                    return User.findOneAndUpdate(
                        { username: username },
                        { $push: { thoughts: _id }},
                        { new: true, runValidators: true },
                    ).then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: "No user with that username." });
                            return;
                        }
                    });
                })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: "No thought found with this id" });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

};

module.exports = thoughtController;