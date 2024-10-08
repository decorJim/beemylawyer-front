# BeemylawyerFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## starting script

"start": "set NODE_OPTIONS=--openssl-legacy-provider && ng serve --open", set NODE_OPTIONS=--openssl-legacy-provider is there because my node version is too advance so either have to downgrade node or do this.  changes in OpenSSL in Node.js v17 and later, which affects how webpack uses certain cryptographic functions.

# command to update angular 1 version at a time else breaks
ng update @angular/core@11 @angular/cli@11
