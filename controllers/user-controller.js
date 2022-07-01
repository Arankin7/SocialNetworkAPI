const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    // get one user by ID
    getUserById({params}, res){
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this ID.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err =>{
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create User
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // add friends
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // remove friends
    removeFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // update User
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete User and all associated thoughts
    deleteUser({params}, res){
        Thought.deleteMany({ userId: params.id })
            .then(() => {
                User.findOneAndDelete({ _id: params.id })
                .then(dbUserData => {
                    if(!dbUserData){
                        res.status(404).json({ message: 'No user found with this ID.'});
                        return;
                    }
                    res.json(dbUserData)
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });   
    }
};

module.exports = userController;