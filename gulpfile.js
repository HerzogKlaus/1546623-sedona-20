const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");

// clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Copy

const copy = () => {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}", "source/js/**", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// HTML copy

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// JS mini and copy

const jsmin = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

exports.jsmin = jsmin;

// Styles

const styles = () => {
  return gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Images

const images = () => {
  return gulp
    .src(["source/img/**/*.{jpg,png,svg,webp}"])
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
      ])
    )
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream({ once: true }));
};

exports.images = images;

//WebP images

const createWebp = () => {
  return gulp
    .src("source/img/**/icon-*.svg")
    .pipe(gulp.dest("build/img"))
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream());
};

exports.webp = createWebp;

//Sprite

const sprite = () => {
  return gulp
    .src(["build/img/**/icon-*.svg", "build/img/**/logo-htmlacademy.svg"])
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
    .pipe(sync.stream({ once: true }));
};

exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/**/*.js", gulp.series("jsmin"));
  gulp.watch(["source/img/**/*.{jpg,png,svg,webp}"], gulp.series("images"));
  gulp.watch(
    ["source/fonts/**/*.{woff,woff2}", "source/*.ico"],
    gulp.series("copy")
  );
  gulp.watch("source/img/**/icon-*.svg", gulp.series("styles", "sprite"));
  gulp
    .watch([
      "source/*.html",
      "source/fonts/**/*.{woff,woff2}",
      "source/js/**/*.js",
    ])
    .on("change", sync.reload);
};

exports.build = gulp.series(clean, copy, html, jsmin, images, sprite, styles);

exports.default = gulp.series(
  clean,
  copy,
  html,
  jsmin,
  images,
  sprite,
  styles,
  server,
  watcher
);
