[![Build Status](https://travis-ci.org/fireflysemantics/validator.svg?branch=master)](https://travis-ci.org/fireflysemantics/validator)

# Firefly Semantics Validator

## Overview

Decorator based validation for Typescript classes.

## Features

- Progressive validation (Only check if the date is valid if the property is non null)
- Cross property validation (Does the start date come before the end date?)
- Cross Property Conditional Validation with `@IfValid` stops cross property validation a dependent property is invalid.
- Access to the entire [ValidationContext](https://github.com/fireflysemantics/validator/blob/master/src/container/validation/ValidationContext.ts) enabling the customization of validation messages post validation
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

## Use Cases

### Progressive Validation

[See this article for an overview of how progressive validation works.](https://medium.com/@ole.ersoy/minimizing-validation-noise-with-fireflysemantics-validator-efef4c95efd4)

[There's also a Stackblitz demo here](https://stackblitz.com/edit/validator-progressive-validation).


### Cross Property Conditional Validation

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

In this case the validation of `secondNumber` depends on the first number.  Thus in order to minimize validation noise, we would like to validate the `secondNumber` only if the first number is valid.  The `@IfValid('firstNumber)` ensures that this will be the case.

## Runtime

This assumes a minimum ES2017 runtime environment.  Use core.js if you think the code will run in non compliant runtimes.  We use `Object.values`, which has an ES2017 a minimum runtime.

