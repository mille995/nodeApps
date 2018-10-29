// contains static configuration data
// e.g., project name, path, environments, port, encryption keys

var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'UCCSSNEW'    },    
                   port: 5000,  
        },  
        production: {    
                     root: rootPath,    
                     app: {      name: 'UCCSSNEW'    },    
                      port: 80,  }
         };

module.exports = config[env];  // square bracket notation to access properties of config

