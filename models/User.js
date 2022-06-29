const { Schema, model } = require('mongoose');

// create the schema for the User
const UserSchema = new Schema (
    {}
);

// use a virtual to get all thoughts

// create the User model
const User = model('User', UserSchema);

module.exports = User;