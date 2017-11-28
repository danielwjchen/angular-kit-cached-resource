'use strict';
module.exports = function(grunt) {
	grunt.config.set('clean', {
        all: ['dist/'],
	});
    grunt.loadNpmTasks('grunt-contrib-clean');
};
