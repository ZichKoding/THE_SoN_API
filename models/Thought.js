const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: "You must have some thoughts?",
            trim: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            // enter a method here to format the data or on query
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: []
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;