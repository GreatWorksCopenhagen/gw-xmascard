# Boilerplate website built on following:

## ES6 + JSPM + Gulp Boilerplate

> A boilerplate for developing ES6+ apps using JSPM & Gulp and babel.
> Forked from https://github.com/alexweber/es6-jspm-gulp-boilerplate and modified

## JSPM

[JSPM](http://jspm.io/) is an all-in-one command line tool for package management, module loading and transpilation. Read more about it [here](http://www.joezimjs.com/javascript/simplifying-the-es6-workflow-with-jspm/) and [here](http://javascriptplayground.com/blog/2014/11/js-modules-jspm-systemjs/).

## Boilerplate Features

- Uses JSPM instead of Bower to manage packages [JSPM](http://jspm.io/)
- Transpiles ES6+ automagically using [Babel](https://babeljs.io/) via JSPM
- Uses [SystemJS](https://github.com/systemjs/systemjs) to load modules via JSPM
- SASS compilation using [LibSass](http://libsass.org/) and [Autoprefixer](https://github.com/postcss/autoprefixer)
- Local dev server using [Gulp Connect](https://github.com/avevlad/gulp-connect)
- Testing using [Karma](http://karma-runner.github.io/) with [Mocha](http://mochajs.org/) + [Chai](http://chaijs.com/) (bonus: write your tests in ES6)
- Linting with [ESLint](http://eslint.org/) and [SCSS-Lint](https://github.com/brigade/scss-lint)
- Generates documentation automatically using [ESDoc](https://esdoc.org/) and [SassDoc](http://sassdoc.com/)
- [Unlicensed](http://unlicense.org/)

## Usage

1. Clone this repo
2. Run `npm install -g bower` in the root directory
3. Run `npm install -g jspm` in the root directory
4. Run `jspm registry create bower jspm-bower-endpoint` in the root directory.
5. Run `npm install` in the root directory
6. Run `jspm install` in the root directory
7. Run `npm install assemble@beta --save` in the root directory
8. Run `gulp` or `npm start` to start the local dev server (you may need to install Gulp locally using `npm install -g gulp`)
9. Run `gulp module` to create a new module, a prompt will ask for module-name, wich will be located in the folder "modules" (it creates .js, .scss and a .hbs file)
10. Run `gulp makeicons` to create icons from svg-files either as sprites or a font. Put the source-svgs in ./src/icons/src in either font- or sprite folder. The dist fonts and css will be located in dist/scss


## Testing

Run `karma start` or `npm test` to run tests once.

Run `npm run test:watch` to run tests continuously.

## Generating documentation

Run `npm run docs` to generate documentation for your JavaScript and SASS automatically in the `docs` folder.

## Building

Run `gulp build` or `npm run build` to build the app for distribution in the `dist` folder.
