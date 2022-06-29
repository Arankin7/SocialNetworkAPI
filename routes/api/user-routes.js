const router = require('express').Router();

// import functions from user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    removeFriend,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// setup routes for Users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// setup routes for user by ID
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;