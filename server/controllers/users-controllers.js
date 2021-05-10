const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'max@gmail.com',
        password: '123456',
    },
    {
        id: 'u2',
        name: 'Manu Biatch',
        email: 'manu@gmail.com',
        password: '123456'
    }
];

const getUsers = async (req, res, next) => {

    let users;

    try {
        users = await User.find({}, '-password')
    } catch (err) {
        return next(new HttpError('fetching users failed!', 500));
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) });

}

const signup = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Please provide valid inputs', 422));
    }

    const { name, email, password, places } = req.body;

    let existingUser;

    try {
       existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Signing Up failed', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('user cannot be created, email already exists', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        places
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({getters: true}) });
}

const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Please provide valid inputs', 422));
    }

    const { email, password } = req.body;

    let identifiedUser;
    
    try {
        identifiedUser = await User.findOne({ email: email });
     } catch (err) {
         const error = new HttpError('Logging In failed', 500);
         return next(error);
     }

    if (!identifiedUser || identifiedUser.password !== password) {
        return next(new HttpError('Invalid credentials', 401));
    }

    res.json({ message: "logged in!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;