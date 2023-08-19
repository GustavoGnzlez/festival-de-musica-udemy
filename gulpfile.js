const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer'); //Instala y ayuda el soporte de parámetros CSS
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require('gulp-cache');//Optimizar imágenes
const imagemin = require('gulp-imagemin');//Optimizar imágenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css (done) {
    // Identificar el archivo de SASS
        src('src/scss/**/*.scss')
        .pipe(sourcemaps.init()) //Nos guarda las referencias al minificar nuestro archivo CSS
    //Plumber evita el cierre de la compilación al tener algún error    
        .pipe(plumber())
        .pipe(sass())// Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.')) //Para que almacene la referencia en la misma carpeta
    // Almacenarla en el disco duro
        .pipe(dest("build/css"))

    done(); // Callback que avisa a gulp cuando llegamos al final
}

//Función Optimizar imágenes
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

//JavaScript
const terser = require('gulp-terser-js');

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    // Identificar los archivos de imagen
    src('src/img/**/*.{png,jpg}')
        //Llamar la función de Gulp-Webp
        .pipe(webp(opciones))
        //Almacenar lo compilado
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    // Identificar los archivos de imagen
    src('src/img/**/*.{png,jpg}')
        //Llamar la función de Gulp-Webp
        .pipe(avif(opciones))
        //Almacenar lo compilado
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

//Función para agregar el watch a SASS y otras funciones
function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);