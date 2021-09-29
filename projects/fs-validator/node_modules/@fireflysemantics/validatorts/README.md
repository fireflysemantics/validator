[![Build Status](https://travis-ci.org/fireflysemantics/validatorts.svg?branch=master)](https://travis-ci.org/fireflysemantics/validatorts)

# Install

```
npm i -S @fireflysemantics/validatorts
```

# Use

```
import { isPort } from '@fireflysemantics/validatorts'
const isPortNumber:boolean = isPort('4200')
console.log(isPortNumber)
```

## Build ValidatorTS

Run `ng build validatorts`

## Running unit tests

Run the Jest Tests for ValidatorTS

`npm t`

## Browse Typedoc

[Typedoc](https://fireflysemantics.github.io/validatorts/doc/modules/_public_api_.html)

## Generate Typedoc 

`npm run doc-validatorts

Typedoc will be contained in the `doc` folder of the root directory.

## Publishing

After building your library with `ng build validatorjs`, go to the dist folder `cd dist/validatorjs` and run `npm publish`.

## Running unit tests

Run `npm t` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
