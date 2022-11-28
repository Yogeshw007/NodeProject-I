const gulp = require('gulp');

// minify the scss and css files
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
// minify the js files
const uglify = require('gulp-uglify-es');
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function (done) {
    console.log('minifying css');
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
        // reversion the css
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/'))
        // manifest - mapping the original file with the revised name
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets/'));

    done();
});

gulp.task('js', function (done) {
    console.log('minifying js');
    gulp.src('./assets/sass/**/*.js')
        .pipe(uglify())
        .pipe(cssnano())
        // reversion the js
        .pipe(rev())
        .pipe(gulp.dest('./assets.css'))
        // manifest - mapping the original file with the revised name
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets/'));

    done();
});

gulp.task('images', function (done) {
    console.log('minifying js');
    gulp.src('./assets/sass/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin())
        .pipe(cssnano())
        // reversion the js
        .pipe(rev())
        .pipe(gulp.dest('./assets.css'))
        // manifest - mapping the original file with the revised name
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets/'));

    done();
});

gulp.task('clean:assets', function (done) {
    del.deleteSync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets, css, js, images'), function (data) {
    console.log('Building assets');
    done();
});