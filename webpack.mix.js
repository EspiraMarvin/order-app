const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/*mix.copy('appOrder/dist/spa/index.html', 'resources/views/app.blade.php')
    .copyDirectory('appOrder/dist/spa', 'public');
*/

mix.copy('appOrder/dist/pwa/index.html', 'resources/views/app.blade.php')
    .copyDirectory('appOrder/dist/pwa', 'public');
