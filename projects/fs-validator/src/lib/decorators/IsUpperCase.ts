import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isUppercase } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is lowercase.  
 * 
 * See {@link isUppercase} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsUpperCase(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be uppercase"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsUpperCase.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isUppercase} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isUppercase}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isUppercase(o[vc.propertyName].value);
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
    if (!isUppercase(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}