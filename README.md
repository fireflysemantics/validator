[![Build Status](https://travis-ci.org/fireflysemantics/validator.svg?branch=master)](https://travis-ci.org/fireflysemantics/validator)

![Validator](pnglogo.png)

# @fireflysemantics/validator

## Introduction

Typescript Validation Decorators and Executor.  Click [API](https://fireflysemantics.github.io/validator/modules/validate.html) for the Validation API Typedoc.

If you like the [@fireflysemantics/validator API](https://www.npmjs.com/package/@fireflysemantics/validator) please star our [Github Repository](https://github.com/fireflysemantics/validator).

## Tutorials

- [Firefly Semantics Validator API Basics](https://developer.fireflysemantics.com/tasks/tasks--validator--fireflly-semantics-validator-api-basics)
- [Minimizing Validation Noise with Firefly Semantics Validator](https://developer.fireflysemantics.com/tasks/tasks--validator--minimizing-validation-noise-with-firefly-semantics-validator)
- [Validating Typescript Data Transfer Objects with Firefly Semantics Validator](https://developer.fireflysemantics.com/tasks/tasks--validator--validating-typescript-data-transfer-objects-with-firefly-semantics-validator)
- [Validating Typescript Business Entities with Firefly Semantics Validator](https://developer.fireflysemantics.com/tasks/tasks--validator--validating-typescript-business-entities-with-firefly-semantics-validator)
- [Validating MasterData Entities with Firefly Semantics Validator](https://developer.fireflysemantics.com/tasks/tasks--validator--validating-master-data-entities-with-firefly-semantics-validator)


## Example
```
/**
 * Validate Todo Entities Example
 */
export class Todo {
  gid?: string;
  id?: string;

  @IsString()
  @IsDefined()
  public title!: string;

  @IsBoolean()
  @IsDefined()
  public completed!: boolean;

  constructor(todo?: any) {
    if (todo) {
      Object.assign(this, todo);
    }
  }
}

const todo = new Todo({ completed: 'yup' });
const todoEntities = [todo];
const errors: EntityError[] = validateEntities(todoEntities, 'gid');
```

### Playground 

https://stackblitz.com/edit/typescript-me2ddn

## Install

```
npm i -S @fireflysemantics/validator @fireflysemantics/validatorts tslib
```

## Typedoc

[Typedoc Documentation](https://fireflysemantics.github.io/validator/)

## Use

The [Typedoc](https://fireflysemantics.github.io/validator/) for each decorator contains usage examples.

Use the [Stackblitz Starter Demo](https://stackblitz.com/edit/typescript-2rlubt?file=GreaterThanCheck.ts) for experimentation.  

See the [Tutorials](https://github.com/fireflysemantics/validator#tutorials) and [Typedoc](https://fireflysemantics.github.io/validator/) for more detailed use API and use case examples.  

```
import { ok } from 'assert';

import {
  validateProperty,
  IsNumber,
  IsGreaterThan,
  IfValid,
  validate,
  ObjectErrors,
  ValidationError,
} from '@fireflysemantics/validator';

class GreaterThanCheck {
  @IsNumber()
  firstNumber: any = null;

  @IsGreaterThan('firstNumber')
  @IsNumber()
  @IfValid('firstNumber')
  secondNumber: number = 22;
}

const GTC = new GreaterThanCheck();
const validFirstNumber: boolean = validateProperty(GTC, 'firstNumber');
ok(!validFirstNumber, 'The firstNumber property is not valid');
const OES: ObjectErrors = validate(GTC);
const errors: ValidationError[] = OES.errors;
ok(errors.length == 2, 'There should be 2 ValidationErrors created');
```

In this case the validation of `secondNumber` depends on the first number.  

We minimize validation noise by triggering validation of `secondNumber` only if the `firstNumber` is valid (`@IfValid('firstNumber')`).



## Features

- Progressive validation (Only check if the date is valid if the property is non null)
- Cross property validation (Does the start date come before the end date?)
- Cross Property Conditional Validation with `@IfValid` stops cross property validation a dependent property is invalid.
- Access to the entire [ValidationContext](https://github.com/fireflysemantics/validator/blob/master/src/ValidationContext.ts) enabling the customization of validation messages post validation
- Executes the decorators is a predictable ordered sequence

The following decorators:

- IfValid
- IsAfterInstant
- IsAlpha
- IsAlphaNumeric
- IsArray
- IsArrayContainerOf
- IsArrayIn
- IsArrayNotEmpty
- IsArrayNotIn
- IsArraySizeGreaterThan
- IsArraySizeLessThan
- IsArrayUnique
- IsAscii
- IsBase64
- IsBeforeInstant
- IsBoolean
- IsBooleanString
- IsByteLength
- IsCreditCard
- IsCurrency
- IsDate
- IsDefined
- IsDivisibleBy
- IsEmail
- IsEmpty
- IsEnum
- IsEqualTo
- IsFQDN
- IsFullWidth
- IsGreaterThan
- IsHalfWidth
- IsHexColor
- IsHexadecimal
- IsIP
- IsISBN
- IsISIN
- IsISODateString
- IsInRange
- IsInstanceOf
- IsInt
- IsJSON
- IsLengthGreaterThan
- IsLengthLessThan
- IsLessThan
- IsLowercase
- IsMilitaryTime
- IsMobilePhone
- IsMongoID
- IsMultibyte
- IsNegative
- IsNotEmpty
- IsNotEqualTo
- IsNotSubString
- IsNotSuperString
- IsNumber
- IsNumberString
- IsPatternMatch
- IsPositive
- IsSameInstant
- IsString
- IsSubString
- IsSuperString
- IsSurrogatePair
- IsURL
- IsUUID
- IsUpperCase
- IsValueIn
- IsValueNotIn
- IsVariableWidth

## Pure Validation API

For the API used to implement the decorators or for pure functions that validate see [@fireflysemantics/validatorts](https://www.npmjs.com/package/@fireflysemantics/validatorts).

## Runtime

This assumes a minimum ES2017 runtime environment.  Use core.js if you think the code will run in non compliant runtimes.  We use `Object.values`, which has an ES2017 a minimum runtime.

## Build

Run `npm run c` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `npm run p`

## Running unit tests

Run `npm t` to execute the unit tests via [Jest](https://jestjs.io/).


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