import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContextContainer } from "../container/validation/ValidationContextContainer";
import { MetaClass } from "../container/validation/MetaClass";
import { ValidationContext } from "../container/validation/ValidationContext";
import { ErrorContainer } from "../container/error/ErrorContainer";
import { ValidationError } from "../container/error/ValidationError";
import { isArrayEmpty } from "@fireflysemantics/is";
import { isString } from "@fireflysemantics/is";
import { ErrorType } from 'typescript-logging';
import { ValidateLogger } from "../logging-config";

/**
 * Validates the <code>target</code> object.
 *
 * Errors are collected by the {@link ErrorContainer}.
 *
 * @param target The array of or object being validated.
 * @return True if the object is valid, false otherwise.
 */
export function validate(target: any): boolean {
  let valid:boolean = true;
  const cn: string = target.constructor.name;
  const mc: MetaClass = ValidationContainer.metaClasses[cn];
  if (mc) {
    mc.properties.forEach(p => {
      if (!validateProperty(target, p)) {
        valid = false;
      }
    });
  }
  return valid;
}

/**
 * Validates a property contained on the object.
 * Errors are added to the ErrorContainer, unless skipErrorGeneration
 * is true.
 *  
 * @param o The object being validated
 * @param propertyName The name of the property holding the value being validated
 * @param skipErrorGeneration Skips the generation of validation errors
 * @return True if the property is valid, false otherwise.
 * @throws An exception if the ValidationContextContainer instance for the object and property does not exist.
 */
export function validateProperty(o: any, propertyName: string, skipErrorGeneration: boolean = false): boolean {

  ValidateLogger.trace(`Validating the property ${propertyName} of ${o.constructor.name}`);
  ValidateLogger.trace(`The parameter skipErrorGeneration is ${skipErrorGeneration}`);

  let valid = true;
  const key = getValidationContextContainerKey(o, propertyName);
  const vcc:ValidationContextContainer = ValidationContainer.cache[key]; 

  if (!vcc) {
    const errorMessage:string = `A validation context container for the key 
    ${key} does not exist.`;

    const error: ErrorType = new Error(errorMessage);
    ValidateLogger.error(errorMessage, error);
    throw error;
  }

  const propertyValue = o[propertyName];

  vcc.vcs.every((vc: ValidationContext) => {

    if ( propertyValue instanceof Array ) {
      const result: Number[] = vc.validateArray(vc, propertyValue);
      if (!isArrayEmpty(result) && !skipErrorGeneration && !vc.skipErrorGeneration) {
        const ve: ValidationError = new ValidationError(
          vc,
          o,
          propertyName,
          propertyValue,
          result
        );
        ErrorContainer.addValidationError(ve);
        valid = false;
      }
    } else {
      valid = vc.validateValue(vc, o); 

      if (!valid && !skipErrorGeneration && !vc.skipErrorGeneration) {

        ValidateLogger.trace(`The property ${propertyName} of ${o.constructor.name} validated by ${vc.decorator} has invalid value ${propertyValue}`);

        const ve: ValidationError = new ValidationError(
          vc,
          o,
          propertyName,
          propertyValue
        );
        ErrorContainer.addValidationError(ve);
      }
    }
    if (!valid && vc.stop) {

      ValidateLogger.trace(`The property ${propertyName} of ${o.constructor.name} is invalid therefore validation of the property is being discontinued`);
      
      return valid;
    } 
    else return true; //Continue validation of the property
  });
  return valid;
}

/**
 * Creates the validation context key used to 
 * lookup the array of ValidationContext instances.
 *
 * @param target The object or name of the object constructor
 * @param propertyName
 * @return The key for the array of ValidationContext instances.
 */
export function getValidationContextContainerKey(
  target: string | any,
  propertyName: string
): string {
  return isString(target)
    ? `${target}_${propertyName}`
    : `${target.constructor.name}_${propertyName}`;
}

/**
 * The signature for the decorator, class,
 * and class property combination.
 */
export function getValidationContextSignature(
  decorator: string,
  targetName: string,
  propertyName: string
): string {
  return `${decorator}_${targetName}_${propertyName}`;
}
