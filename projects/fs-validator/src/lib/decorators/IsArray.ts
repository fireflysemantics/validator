import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArray } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property is an Array.
 * 
 * See {@link isArray} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsArray(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArray.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage,
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

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link IsArray}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be an array";
  return  errorMessageTemplate(vc, o, messageLiteral)
}