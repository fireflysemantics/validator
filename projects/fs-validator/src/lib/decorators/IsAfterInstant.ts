import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isDate, isAfter } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property is after the argument.
 * 
 * @param target Either a date instance or the name of the property containing the date used in the comparison.
 * @param validationOptions The validation options
 */
export function IsAfterInstant(target: Date | string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    const validationParameters: any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsAfterInstant.name,
      propertyName,
      validateValue,
      undefined,
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
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the date comparison
 */
export function validateValue(vc: ValidationContext, o: any): boolean {
  let constraint = vc.validationParameters[0];
  const after: Date = o[vc.propertyName]

  if (!!isDate(constraint).value) {
    //=========================================
    // The target is the constraint date 
    // to the annotation
    //=========================================
    return !!isAfter(after, constraint).value
  }

  //=========================================
  // The constraint date is on
  // another property value
  //=========================================
  let constraintReference: Date = o[vc.validationParameters[0]];
  return !!isAfter(after, constraintReference).value;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isAfterInstant}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any): string {

  const messageLiteral: string = `should come after ${vc.validationParameters[0]}`;
  return  errorMessageTemplate(vc, o, messageLiteral)
}