'use strict';
module.exports = function(grunt) {
	grunt.config.set('jshint', {
        files: [
            'gruntfile.js', 
            'src/**/*.js', 
        ],
        options: {
            // options here to override JSHint defaults
            globals: {
                jQuery: true,
                console: true,
                module: true,
                document: true,
            }
        }
	});
    grunt.loadNpmTasks('grunt-contrib-jshint');
};