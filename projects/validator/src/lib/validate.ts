import { ValidationContainer } from "./ValidationContainer"
import { MetaClass } from "./MetaClass"
import { ValidationContext } from "./ValidationContext";
import { ValidationError } from "./ValidationError";
import { isArrayEmpty, isString } from "@fireflysemantics/is";
import { ObjectErrors } from "./ObjectErrors"; 
import { getPropertyKey } from "./utilities"

/**
 * Validates the <code>target</code> object.
 *
 * Errors are collected by the {@link ErrorContainer}.
 *
 * @param target The object being validated.
 * @return The {@link ObjectErrors} instance
 * @example
```
class Invalid {
  @IsDefined() p0: any = null;
}
const I = new Invalid();

let oes = validate(I);
expect(validate(I).valid).toBeFalsy();
const key = getPropertyKey(I, 'p0');//Invalid_p0
expect(oes.getErrors(key).length).toBeGreaterThan(0);
expect(oes.errors[0].errorMessage).toContain('p0');

```
 */
export function validate(target: any): ObjectErrors {
  let oes: ObjectErrors = new ObjectErrors();
  const cn: string = target.constructor.name;
  const mc: MetaClass = ValidationContainer.metaClasses.get(cn);
  if (mc) {
    mc.properties.forEach(p => {
      if (!validateProperty(target, p, oes)) {
        oes.valid = false;
      }
    });
  }
  return oes;
}

/**
 * Validates a property contained on the object.
 * Errors are added to the ErrorContainer, unless skipErrorGeneration
 * is true.
 *
 * @param o The object being validated
 * @param propertyName The name of the property holding the value being validated
 * @param oes The {@link ObjectErrors} instance used to collect validation errors
 * @param skipErrorGeneration Skips the generation of validation errors
 * @return true if the property is valid, false otherwise.
 * @throws An exception if the ValidationContextContainer instance for the object and property does not exist.
 */
export function validateProperty(
  o: any,
  propertyName: string,
  oes?:ObjectErrors,
  skipErrorGeneration: boolean = false
): boolean {
  let valid = true;
  const key = getPropertyKey(o, propertyName);
  const vca: ValidationContext[] = ValidationContainer.cache.get(key);
 
  if (!vca) {
    const errorMessage: string = `A validation context array for the key 
    ${key} does not exist.`;
    throw new Error(errorMessage);
  } 

  const propertyValue = o[propertyName];
  vca.every((vc: ValidationContext) => {
    if (propertyValue instanceof Array) {
      const result: Number[] = vc.validateArray(vc, propertyValue);
      if (
        !isArrayEmpty(result) &&
        !skipErrorGeneration &&
        !vc.skipErrorGeneration
      ) {
        const ve: ValidationError = new ValidationError(
          vc,
          o,
          propertyName,
          propertyValue,
          result
        );
        if (oes) {
          oes.addValidationError(ve);
          oes.valid = false;  
        }
      }
    } else {
      valid = vc.validateValue(vc, o);
      
      if (!valid && !skipErrorGeneration) {
        const ve: ValidationError = new ValidationError(
          vc,
          o,
          propertyName,
          propertyValue
        );
        if (oes) {
          oes.addValidationError(ve);
          oes.valid = false;  
        }
      }
    }
    if (!valid && vc.stop) {
      //Discontinue validation
      return false;
    } else return true; //Continue validation of the property
  });
  return valid;
}