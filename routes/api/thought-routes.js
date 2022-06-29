const router = require('express').Router();

// import functions from thought controller
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeReaction,
    removeThought,
} = require('../../controllers/thought-controller');

// get/post routes for thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

    // get|put|delete routes for thoughts by ID
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

    // post route for reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

    // delete route for reactions
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;