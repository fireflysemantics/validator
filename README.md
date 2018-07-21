# Firefly Semantics Validator

## Overview

Decorator based validation for Typescript classes.

## Features

- Has decorators for most of the methods in [@fireflysemantics/is]
- Allows the definition of dependencies between validators
- Uses [typescript-logging](https://www.npmjs.com/package/typescript-logging) to capture traces and error logs
- Access to the entire [ValidationContext](https://github.com/fireflysemantics/validator/blob/master/src/container/validation/ValidationContext.ts) enabling the customization of validation messages post validation
- Executes the annotations in an ordered sequence
- Stops validation when appropriate to minimize validation noise.

## Use Cases

### General Usage

```
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { IsGreaterThan } from "@fireflysemantics/decorators/IsGreaterThan";
import { ErrorContainer } from "@fireflysemantics/container/error/ErrorContainer";
import { getValidationContextContainerKey } from "@fireflysemantics/utilities/utilities";
import { validateProperty, validate } from "@fireflysemantics/utilities/utilities";

class IsGreaterThanTest0 {
  @IsGreaterThan(30)
  secondNumber: number = 20;
}

const IGTT0 = new IsGreaterThanTest0();

expect(validate(IGTT0)).to.be.false;
const key:string = getValidationContextContainerKey(IGTT0, "secondNumber");
const vc:ValidationContext = ErrorContainer.getValidationErrors(key)[0].vc;
console.log(vc.errorMessage(vc, IGTT0)); //The value contained by secondNumber should be greater than 30

```

### Dependent Validation of a Property

In some cases we want to validate something else only when a corresponding property
on the instances is valid.  For example:

```
class GreaterThanCheck { 
     @IsNumber
     firstNumber: any = null;

     @IsGreaterThan("firstNumber")
     @IsNumber()
     @IfValid('firstNumber)
     secondNumber = 22; 
}
```

In this case the validation of `secondNumber` depends on the first number.  Thus in order to minimize validation noise, we would like to validate the `secondNumber` only if the first number is valid.

## Runtime

This assumes a minimum ES2017 runtime environment.  Use core.js if you think the code will run in non compliant runtimes.  We use `Object.values`, which has an ES2017 a minimum runtime.

