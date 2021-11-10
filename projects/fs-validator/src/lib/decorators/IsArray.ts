import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArray } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is an Array.
 * 
 * ### Example
 *  
 * ```ts
 * class IsArrayDemo {
 *     @isArray() alpha:any[] = [1,2,3]
 * }
 *  ```
 * 
 * @param validationOptions The validation options
 */
export function IsArray(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should be an array"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArray.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage(messageFunction),
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link IsArray} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the property is an array
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isArray(o[vc.propertyName]).value
}