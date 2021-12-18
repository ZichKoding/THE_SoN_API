const { Schema, model, Types } = require('mongoose');

// Collection Schema for Replies
const ReactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Collection Schema for Thoughts
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
            type: Schema.Types.String,
            ref: 'User'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get a count of reactions to a thought
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;