import { ValidationContainer } from "./ValidationContainer";
import { MetaClass } from "./MetaClass";
import { ValidationContext } from "./ValidationContext";
import { ValidationError } from "./ValidationError";
import { isArray, isArrayEmpty } from "@fireflysemantics/validatorts";
import { ObjectErrors } from "./ObjectErrors";
import { getPropertyKey } from "./utilities";

/**
 * Validates the <code>target</code> object.
 * 
 * ### Example
 * ```
 * class Invalid {
 *     @IsDefined() p0: any = null; 
 * }
 * const I = new Invalid(); 
 * let oes = validate(I);
 * expect(oes.valid).toBeFalsy();
 * const key = getPropertyKey(I, 'p0');//Invalid_p0
 * expect(oes.getErrors(key).length).toBeGreaterThan(0);
 * expect(oes.errors[0].errorMessage).toContain('p0');
 * ``` 
 *
 * @param target The object being validated.
 * @param exclude Array of property values to exclude from validation.
 * @return The {@link ObjectErrors} instance
 */
export function validate(target: any, exclude?: string[]): ObjectErrors {
  let oes: ObjectErrors = new ObjectErrors();
  const cn: string = target.constructor.name;
  const mc: MetaClass = ValidationContainer.metaClasses.get(cn)!;
  if (mc) {
    let properties: string[] = mc.properties
    if (exclude && exclude.length) {
      properties = mc.properties.filter(p => !exclude.includes(p))
    }

    properties.forEach(p => {
      if (!validateProperty(target, p, oes)) {
        oes.valid = false;
      }
    });
  }
  return oes;
}

/**
 * Validate multiple entity instances
 * 
 * ### Example
 * ```
 * class Invalid {
 *     @IsDefined() p0: any = null; 
 * }
 * 
 * let entities:Invalid[] = [ new Invalid(), new Invalid() ]
 * let oesArr:ObjectErrors[] = validateN(entities)
 * expect(oesArr[0].valid).toBeFalsy();
 * expect(oesArr[1].valid).toBeFalsy();
 * ```
 * 
 * @param entities The array of entities to be validated.
 * @param exclude Array of property values to exclude from validation.
 * @return The `ObjectErrors` array which is empty if there are no errors
 */
export function validateN(entities: any[], exlude?: string[]): ObjectErrors[] {
  const objectErrorsArray: ObjectErrors[] = [];
  entities.forEach(e => {
    const oe: ObjectErrors = validate(e, exlude);
    if (!oe.valid) {
      objectErrorsArray.push(oe);
    }
  });
  return objectErrorsArray;
}

/**
 * Validates a property contained on the object.
 * Errors are added to the {@link ObjectErrors},
 * instance, unless skipErrorGeneration is true.
 * 
 * ### Example
 * 
 * ```
 * class Invalid {
 *   @IsDefined() p0: any = null;
 * }
 * const I = new Invalid();
 * let oes = new ObjectErrors();
 * expect(validateProperty(I, 'p0', oes)).toBeFalsy();
 * const key = getPropertyKey(I, 'p0');
 * expect(oes.getErrors(key).length).toBeGreaterThan(0);
 *```
 * @param o The object being validated
 * @param propertyName The name of the property holding the value being validated
 * @param oes The {@link ObjectErrors} instance used to collect {@link ValidationError}s
 * @param skipErrorGeneration Skips the generation of validation errors
 * @return true if the property is valid, false otherwise.
 * @throws An exception if the ValidationContextContainer instance for the object and property does not exist.
 */
export function validateProperty(
  o: any,
  propertyName: string,
  oes?: ObjectErrors,
  skipErrorGeneration: boolean = false
): boolean {
  
  let valid = true;
  const key = getPropertyKey(o, propertyName);
  const vca: ValidationContext[] = ValidationContainer.cache.get(key)!;

  if (!vca) {
    const errorMessage: string = `A validation context array for the key 
    ${key} does not exist.`;
    throw new Error(errorMessage);
  }

  const propertyValue = o[propertyName];
  vca.every((vc: ValidationContext) => {

    if (vc.validationOptions && vc.validationOptions.skipErrorGeneration) {
      vc.skipErrorGeneration = true
    }

    //===================================================
    //We only process array valued properties with 
    //validateArray if it is defined
    //===================================================
    if (isArray(propertyValue).value && vc.validateArray) {
      const result: Number[] = vc.validateArray!(vc, propertyValue);
      if (
        !isArrayEmpty(result).value &&
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
      if (oes) { oes.valid = valid }

      if (!valid && !skipErrorGeneration && !vc.skipErrorGeneration && oes
      ) {
        const ve: ValidationError = new ValidationError(
          vc,
          o,
          propertyName,
          propertyValue
        );
        oes.addValidationError(ve);
      }
    }
    if (!valid && vc.stop) {
      //Discontinue validation
      return false;
    }
    else return true; //Continue validation of the property
  });
  return valid;
}