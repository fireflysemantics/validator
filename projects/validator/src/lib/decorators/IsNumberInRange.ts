import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNumberInRange, isDefined } from "@fireflysemantics/is";

/**
 * Decorator that checks if the number
 * is in range.  
 * 
 * @param min The minimum length.
 * @param max The maximum length.
 * @param validationOptions The validation options
 */
export function IsNumberInRange(min: number, max?: number, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    const validationParameters: any[] = [];
    validationParameters.push(min);
    if (isDefined(max)) {
      validationParameters.push(max);
    }
    else {
      validationParameters.push(Infinity);
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNumberInRange.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it in the assigned number range.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link length}
 */
export function validateValue(vc: ValidationContext, o: any): boolean {
  const value = o[vc.propertyName]
  const min: number = vc.validationParameters[0];
  let max = vc.validationParameters[1] ? vc.validationParameters[1] : Infinity;
  return isNumberInRange(value, min, max)
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc: ValidationContext, values: any[]): Array<number> {
  const min: number = vc.validationParameters[0];
  let max: number = null;
  if (vc.validationParameters[1] !== undefined) {
    max = vc.validationParameters[1];
  }
  const errorIndex: Array<number> = [];
  values.forEach((v, i) => {
    if (!isNumberInRange(v, min, max)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link length}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any): string {

  const messageLiteral: string = `should be in the range [${vc.validationParameters[0]}-${vc.validationParameters[1]}]`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}