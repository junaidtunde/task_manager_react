'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

function verifyToken(req, res, next) {
    // GET THE AUTH HEADER VALUE
    var bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // verify jwt
        _jsonwebtoken2.default.verify(bearerHeader, process.env.SECRET_KEY, function (err, data) {
            _models2.default.User.findById(data.user).then(function (user) {
                if (user) {
                    req.user = data.user;
                    next();
                } else {
                    res.status(403).json({ status: false, message: 'Unauthorized' });
                }
            }).catch(function (err) {
                if (err) {
                    res.status(403).json({ status: false, message: 'Unauthorized' });
                }
            });
        });
    } else {
        //forbiden
        res.status(403).json({ status: false, message: 'Unauthorized' });
    }
}

function verifyAdmin(req, res, next) {
    var bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        _jsonwebtoken2.default.verify(bearerHeader, process.env.SECRET_KEY, function (err, data) {
            if (err) {
                res.status(403).json({ status: false, message: 'Unauthorized' });
            } else {
                _models2.default.Admin.findById(data.admin).then(function (admin) {
                    if (admin) {
                        req.admin = data.admin;
                        next();
                    } else {
                        res.status(403).json({ status: false, message: 'Unauthorized' });
                    }
                });
            }
        });
    } else {
        res.status(403).json({ status: false, message: 'Unauthorized' });
    }
}

routes.get('/', function (req, res) {
    res.json({ status: true });
});

// user routes
routes.post('/user/login', _controllers2.default.userController.loginUser);
routes.post('/user/register', _controllers2.default.userController.registerUser);
routes.get('/user/all', _controllers2.default.userController.getAllUsers);
routes.get('/user/getInfo', verifyToken, _controllers2.default.userController.getUserInfo);

// Admin Routes
routes.post('/admin/create', _controllers2.default.adminController.createAdmin);
routes.post('/admin/login', _controllers2.default.adminController.login);
routes.get('/admin/one', verifyAdmin, _controllers2.default.adminController.getAdminDetails);

// Task Routes
routes.post('/task/create', verifyAdmin, _controllers2.default.taskController.createTask);
routes.put('/task/inprogress', verifyToken, _controllers2.default.taskController.changeStatusToProgress);
routes.put('/task/completed', verifyToken, _controllers2.default.taskController.changeStatusToCompleted);
routes.put('/task/archive', verifyAdmin, _controllers2.default.taskController.changeStatusToArchived);
routes.get('/task/all', _controllers2.default.taskController.getAllTasks);

// Comment Routes
routes.post('/comment/create', verifyToken, _controllers2.default.commentController.createComment);
routes.post('/comment/fetch', _controllers2.default.commentController.fetchCommentsAllByTask);
routes.delete('/comment/delete/:id', verifyAdmin, _controllers2.default.commentController.deleteComment);

exports.default = routes;
//# sourceMappingURL=routes.js.map