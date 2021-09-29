[![Build Status](https://travis-ci.org/fireflysemantics/is.svg?branch=master)](https://travis-ci.org/fireflysemantics/is)

# @fireflysemantics/is

Typescript type testing and validation library.  See [API](https://fireflysemantics.github.io/is/doc/) for all methods provided.

## Install

The `@fireflysemantics/is` library declares `@fireflysemantics/validatorts` as a peer dependency.

Therefore both libraries must be installed by your application.

```
npm i -S @fireflysemantics/validatorts

npm i -S @fireflysemantics/is

```

```

Note that if you are using the `FESM5` package format the `tslib` peer dependency must also be installed.

```
npm i -S npm i tslib
```

# Supported Package Formats

The library is built with the Angular Package Format.  It therefore supports all these package formats (As can be seen in the provided `package.json`) and has integrated typescript definitions:

- "main": "bundles/fireflysemantics-validatorts.umd.js",
-  "module": "fesm5/fireflysemantics-validatorts.js",
-  "es2015": "fesm2015/fireflysemantics-validatorts.js",
-  "esm5": "esm5/fireflysemantics-validatorts.js",
-  "esm2015": "esm2015/fireflysemantics-validatorts.js",
-  "fesm5": "fesm5/fireflysemantics-validatorts.js",
-  "fesm2015": "fesm2015/fireflysemantics-validatorts.js",
-  "typings": "fireflysemantics-validatorts.d.ts"

## Typedoc

[Typedoc](https://fireflysemantics.github.io/is/doc/)

## Build

Run `ng build is` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build is`, go to the dist folder `cd dist/is` and run `npm publish`.

## Blog

- [Application Central Nervous System](https://medium.com/@ole.ersoy/application-central-nervous-system-37aba8e5e899)
- [Angular Application Central Nervous System Brain](https://medium.com/@ole.ersoy/angular-application-nervous-system-brain-685a684f357)

## Usage

We use this library to implement the validation decorators in [@fireflysemantics/validator](https://www.npmjs.com/package/@fireflysemantics/validator).  The functions can also be used to add semantic meaning to your test cases using [NPM Assert](https://www.npmjs.com/package/assert) or Jest and the same goes for general boolean logic in your source code.

For example instead of:
```ts
import { ok } from "assert";
ok(decorator != null, "The decorator is not null or undefined"); 
```

Use:
```ts
import { ok } from "assert";
import {isDefined} from "@fireflysemantics/is";

ok(isDefined(decorator)); 
```

See the [test cases](https://github.com/fireflysemantics/is/blob/master/src/is.spec.ts).  For additional detail also see the [validator.js test cases](https://github.com/chriso/validator.js/tree/master/test).



## Running unit tests

Run `npm t` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
