import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayContainerOf } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the array value
 * is not in array of allowed values.  
 * 
 * @param validationOptions The validation options
 */
export function IsArrayNotIn(target: any[], validationOptions?: ValidationOptions) {

  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayNotIn.name,
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

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link IsNotIn}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should not be in the target array";
  return  errorMessageTemplate(vc, o, messageLiteral)

}
