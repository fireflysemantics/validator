import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArraySizeLessThan } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks that the size of the array property is less than the argument.  
 * 
 * See {@link isArraySizeLessThan} for a description of the method
 * performing the validation.
 * 
 * @param target The number that the array is being checked against.
 * @param validationOptions The validation options
 */
export function IsArraySizeLessThan(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArraySizeLessThan.name,
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
 * Value is valid if it passes the {@link isArraySizeLessThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the array size is less than the constraint
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const constraint:number = vc.validationParameters[0];
  return !!isArraySizeLessThan(o[vc.propertyName], constraint).value;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isArraySizeLessThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = `should have an array size less than ${vc.validationParameters[0]}`;
  return  errorMessageTemplate(vc, o, messageLiteral)

}
