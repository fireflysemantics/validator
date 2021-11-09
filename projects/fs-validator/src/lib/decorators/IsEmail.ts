import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isEmail, IsEmailOptions } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value is a valid email address.  
 * 
 * See {@link isEmail} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsEmail(options?: IsEmailOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a valid email address"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsEmail.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      [],
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isEmail} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isEmail}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isEmail(o[vc.propertyName], vc.validationTypeOptions).value;
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
    if (!isEmail(v, vc.validationTypeOptions).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}