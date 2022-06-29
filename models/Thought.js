const { Schema, model } = require('mongoose');

// create Reaction Schema

// create the Thought schema
const ThoughtSchema = new Schema(
    {}
);

// create virtual to return Reactions

// create the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
