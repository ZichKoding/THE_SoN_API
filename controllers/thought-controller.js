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
        // validate the user before creating the thought.
        User.findOne({ username: body.username})
        .then(dbUserData => {
            if (!dbUserData._id) {
                res.status(404).json({ message: "No user found with that username" });
                return;
            }
            return Thought.create(body)
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
        Thought.findOneAndUpdate(
            { _id: params.id },
            { thoughtText: body.thoughtText },
            { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id'});
                }

                return User.findOneAndUpdate(
                    { username: params.username },
                    { $pull: {thoughts: params.id}},
                    { new: true }
                )
            })
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