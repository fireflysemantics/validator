import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayUnique } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**a
 * Decorator that checks that the property is an array
 * and that it is one containing unique values.  
 * 
 * See {@link isArrayUnique} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsArrayUnique(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should be an array with unique values"
    }
      
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayUnique.name,
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
 * Value is valid if it passes the {@link isArrayUnique} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isArrayUnique}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isArrayUnique(o[vc.propertyName]).value;
}
