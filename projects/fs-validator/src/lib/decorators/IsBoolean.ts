import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isBoolean } from "@fireflysemantics/validatorts";
import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property is an Array.  
 * 
 * @param validationOptions The validation options
 */
export function IsBoolean(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsBoolean.name,
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
 * Value is valid if it passes the {@link isBoolean} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is valid, false otherwise.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isBoolean(o[vc.propertyName]).value;
}

/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isBoolean(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isBoolean}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be a real boolean";
  return  errorMessageTemplate(vc, o, messageLiteral)
}
