const { Schema, model } = require('mongoose');

// create the schema for the User
const UserSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: 'A username is required.',
            trim: true
        },
        email: {
            type: String,
            required: 'A valid email is required.',
            unique: true,
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            // not sure what is needed here yet | Array of _id values referencing the User model(self-reference) 
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// use a virtual to retrieve the length of the user's friends 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

// create the User model
const User = model('User', UserSchema);

module.exports = User;