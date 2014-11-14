var gulp = require('gulp'),
  compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  handlebars = require('gulp-ember-handlebars'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('css', function() {
  return gulp.src('sass/*.scss')
    .pipe(compass({ sass: 'scss' }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('templates', function() {
  gulp.src(['templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser',
      namespace: 'Ember.TEMPLATES'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/js'));
});



gulp.task('scripts', function() {
  var scriptSrc = [
    'bower_components/jquery/jquery.js',
    'bower_components/handlebars/handlebars.runtime.js',
    'bower_components/ember/ember.js',
    // 'bower_components/ember-data.js',
    'js/vendor/local-storage-adapter.js',
    'js/helpers.js',
    'js/main.js',
    'js/templates.js',
    'js/components.js',
    'js/models/*.js',
    'js/controllers/*.js',
    'js/router.js',
    'js/views/*.js',
    'js/fixtures.js',
    'js/routes/*.js'
  ];
 
  return gulp.src(scriptSrc)
    .pipe(uglify({ mangle: false }))
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('public/js'));
});


gulp.task('watch', function() {
  //watches SCSS files for changes
  gulp.watch('scss/*.scss', ['css']);
 
  //watches handlebars files for changes
  gulp.watch('templates/**/*.hbs', ['templates']);
   
  //watches JavaScript files for changes
  gulp.watch('js/**/*.js', ['scripts']);
}); 




gulp.task("start", ["css", "templates", "scripts", "watch"]);





