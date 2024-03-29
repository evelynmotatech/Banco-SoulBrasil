"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _storage = require('../helpers/storage'); var _storage2 = _interopRequireDefault(_storage);

function authMiddleware (req, res, next) {
    const chave = _storage2.default.getItem('token')
    

    _jsonwebtoken2.default.verify(chave, {"secret": "832374c92d8272d8c100bf63118bc3ac"}.secret, (err, decoded) => {
        if (err){
            res.status(401).send({ error: 'Token invalido'})
        }
        _storage2.default.setItem('userId', decoded.id)
        return next()
    })
}

exports. default = authMiddleware