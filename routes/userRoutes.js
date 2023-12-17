const express = require('express');
const userRouter = express.Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    userLogin,
    userLogout,
} = require('../controllers/userControllers');


userRouter.get('/', getUsers);
userRouter.put('/edit/:userId', updateUser);
userRouter.delete('/delete/:userId', deleteUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.post('/newUser', createUser);

module.exports = userRouter;
