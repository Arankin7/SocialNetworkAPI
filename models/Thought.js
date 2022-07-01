const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create Reaction Schema
const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: 'A username is required to post a reaction'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)            
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// create the Thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'A username is required to post your thoughts'
        },
        reactions: [ReactionSchema]
    },
    {
        toJson: {
            getters: true
        }
    }
);

// create virtual to return the length of the thoughts reactions array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
