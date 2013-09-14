module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jade: {
        files: ['app/views/**'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['public/views/**'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: ['public/js/**'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: ['public/sass/**', 'public/styl/**'],
        tasks: ['compass', 'stylus'],
        options: {
          livereload: true,
          force: true
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['public/styl/**']
        },
        files: {
          'public/css/views/articles.css': 'public/styl/views/articles.styl'
          // 'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
        }
      }
    },
    jshint: {
      all: ['gruntfile.js', 'public/js/**/*.js', 'test/**/*.js', 'app/**/*.js']
    },
    compass: { //Task
      dist: { //Target
        options: { //Target options
          sassDir: 'public/sass',
          cssDir: 'public/css',
          environment: 'production'
        }
      },
      dev: { //Another target
        options: {
          sassDir: 'public/sass',
          cssDir: 'public/css'
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  //Load NPM tasks 
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint', 'compass', 'concurrent:target']);
};