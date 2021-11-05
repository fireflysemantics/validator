import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isGreaterThanFinite, isString } from "@fireflysemantics/validatorts";

/**
 * Decorator that checks if the property value
 * is greater than the argument.  
 * 
 * See {@link isGreaterThan} for a description of the method
 * performing the validation.
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsGreaterThan(target: number | string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsGreaterThan.name,
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
 * Value is valid if it passes the {@link isGreaterThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isGreaterThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  let target:number | string = vc.validationParameters[0];
  if (isString(target).value) {
    target = o[target];
  }
  return !!isGreaterThanFinite(o[vc.propertyName], <number>target).value;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isGreaterThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `should be greater than ${vc.validationParameters[0]}`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
