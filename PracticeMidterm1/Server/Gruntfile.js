module.exports = function (grunt) {

    // configure the grunt tasks - environment
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        nodemon: {
            dev: { script: 'index.js' }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');


    grunt.registerTask('default', [
        'nodemon'
    ]);


};


