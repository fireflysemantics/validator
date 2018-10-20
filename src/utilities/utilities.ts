import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContextContainer } from "../container/validation/ValidationContextContainer";
import { MetaClass } from "../container/validation/MetaClass";
import { ValidationContext } from "../container/validation/ValidationContext";
import { ValidationError } from "../container/error/ValidationError";
import { isArrayEmpty } from "@fireflysemantics/is";
import { isString } from "@fireflysemantics/is";
import { ObjectErrors } from "../container/error/ObjectErrors"; 
import { ErrorType } from "typescript-logging";

/**
 * Validates the <code>target</code> object.
 *
 * Errors are collected by the {@link ErrorContainer}.
 *
 * @param target The object being validated.
 * @return True if the object is valid, false otherwise.
 */
export function validate(target: any): ObjectErrors {
  let oes: ObjectErrors = new ObjectErrors();
  const cn: string = target.constructor.name;
  const mc: MetaClass = ValidationContainer.metaClasses[cn];
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
 * @param skipErrorGeneration Skips the generation of validation errors
 * @return true if the property is valid, false otherwise.
 * @throws An exception if the ValidationContextContainer instance for the object and property does not exist.
 */
export function validateProperty(
  o: any,
  propertyName: string,
  oes:ObjectErrors,
  skipErrorGeneration: boolean = false
): boolean {
  let valid = true;
  const key = getObjectPropertyKey(o, propertyName);
  const vcc: ValidationContextContainer = ValidationContainer.cache[key];

  if (!vcc) {
    const errorMessage: string = `A validation context container for the key 
    ${key} does not exist.`;
    const error: ErrorType = new Error(errorMessage);
    throw error;
  }

  const propertyValue = o[propertyName];

  vcc.vcs.every((vc: ValidationContext) => {
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
        oes.addValidationError(ve);
        oes.valid = false;
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
        console.log("THIS IS THE FUNCTION: ", oes.addValidationError);
        oes.addValidationError(ve);
        oes.valid = false;
      }
    }
    if (!valid && vc.stop) {
      //Discontinue validation
      return valid;
    } else return true; //Continue validation of the property
  });
  return valid;
}

/**
 * Creates the validation context key used to
 * lookup the array of ValidationContext instances.
 * 
 * @example 
 * ```ts
 * getValidationContextContainerKey('Order', 'date')//returns `Order_date`.
 * ```
 * 
 * 
 * For example if the class name of the instance being
 * validated is `Order` and the property being validated is
 * `date` then the value produced by the `
 * is `Order_date`.
 *
 * @param target The object or name of the object constructor
 * @param propertyName
 * @return The key for the array of ValidationContext instances.
 */
export function getObjectPropertyKey(
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
 *
 * Below is a getValidationContextSignature 
 * example of what would be produced
 * when the {@link ValidationContext} were formed from the
 * {@link IfValid} annotation applied to the `purchasePrice`
 * property of a `SalesOrder` instance.
 *
 * @example
 *
 * ```ts
 * IfValid_SalesOrder_purchasePrice
 * ```
 *
 */
export function getValidationContextSignature(
  decorator: string,
  targetName: string,
  propertyName: string
): string {
  return `${decorator}_${targetName}_${propertyName}`;
}
