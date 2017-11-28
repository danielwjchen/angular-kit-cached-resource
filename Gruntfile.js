/**
 * Defines ng-kit.rest-resource GruntJS tasks.
 */
'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    });
    require('./grunt/clean')(grunt);
    require('./grunt/jshint')(grunt);
    require('./grunt/uglify')(grunt);
    require('./grunt/watch')(grunt);

    var taskDefinition = {
        'compile': [
            'clean', 
            'jshint', 
            'uglify',
        ],
        'default': ['compile', 'watch']
    };
    Object.keys(taskDefinition).forEach(function(taskName) {
        grunt.registerTask(taskName, taskDefinition[taskName])
    });
};
