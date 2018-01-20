module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public'],
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/app.min.js': [
            'js/jquery-3.2.1.min.js',
            'js/underscore-min.js',
            'js/bootstrap.min.js',
            'js/jquery.countdown.min.js',
            'js/scripts.js'
          ]
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/style.min.css': ['css/*']
        }
      }
    },
    copy: {
      fonts: { expand: true, cwd: './fonts', src: '*', dest: 'public/fonts'},
      html: { expand: true, cwd: './html', src: '*', dest: 'public'},
      php: { expand: true, cwd: './php', src: '*', dest: 'public'},
      images: { expand: true, cwd: './img', src: '*', dest: 'public/img'},
      favicon: { expand: true, cwd: './img', src: 'favicon.ico', dest: 'public'}
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'copy']);

};