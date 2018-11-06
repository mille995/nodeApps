var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

       var config = {
        development: {
            root: rootPath,
            app: { name: 'Midterm' },
            port: 3300,
            db: 'mongodb://127.0.0.1/foobar-dev'
        },
    
    
        production: {
            root: rootPath,
            app: { name: 'Midterm' },
            port: 80,
            db: 'mongodb://127.0.0.1/foobar'
        }
    
    };

module.exports = config[env];
