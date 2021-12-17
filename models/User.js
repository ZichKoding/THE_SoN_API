const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
        firstName: {
            type: String,
            required: 'Must add your first name.',
            trim: true
        },
        lastName: {
            type: String,
            required: 'Must add your last name',
            trim: true
        },
        username: {
            type: String,
            required: 'Username is required',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'Email is required',
            trim: true,
            // regex to match for an @ in an email
            // xxxxx@xxxxx
            match: [/.+\@.+\..+/],
            unique: true
        },
        password: {
            type: String,
            required: 'Must have a password with minimum length of 6 characters',
            trim: true,
            minlength: 6,
            bcrypt: true,
            select: false
        },
        userCreated: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.plugin(require('mongoose-bcrypt'));

const User = model('User', UserSchema);

module.exports = User;