var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'PracticeMidterm1' },
        port: 3300,
        db: 'mongodb://127.0.0.1/todo-dev'
    },
    production: {
        root: rootPath,
        app: { name: 'PracticeMidterm1' },
        port: 80,
        db: 'mongodb://127.0.0.1/todo'
    }
};

module.exports = config[env];
