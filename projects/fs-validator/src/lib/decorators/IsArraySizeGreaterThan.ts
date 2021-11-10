import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArraySizeGreaterThan } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the size of the array property is greater than the argument.  
 * 
 * ### Example
 * ```
 *  class IsArraySizeGreaterThanDemo {
 *     @IsArraySizeGreaterThan(2)
 *      p0: any[] = [1,2,3]
 * }
 * ```
 * 
 * @param target The number that the array is being checked against.
 * @param validationOptions The validation options
 */
export function IsArraySizeGreaterThan(target: number, validationOptions?: ValidationOptions) {

  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return `should have an array size greater than ${vc.validationParameters[0]}`
    }
  
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      isArraySizeGreaterThan.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage(messageFunction),
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isArraySizeGreaterThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isArraySizeGreaterThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const constraint:number = vc.validationParameters[0];
  return !!isArraySizeGreaterThan(o[vc.propertyName], constraint).value;
}