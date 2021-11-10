import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayContainerOf } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the array value
 * is not in array of allowed values.  
 * 
 * ### Example
 * ```
 * class IsArrayNotInDemo {
 *     @IsArrayIn([1,2,3])
 *     p0: any[] = [1,2,4]
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsArrayNotIn(target: any[], validationOptions?: ValidationOptions) {
  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should not be in the target array"
    }
  
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayNotIn.name,
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
 * Check whether the value is not in the target array
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is not in the target array.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !isArrayContainerOf(target,o[vc.propertyName]).value;
}