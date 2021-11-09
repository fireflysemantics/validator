import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isInt } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property is an integer.
 * 
 * See {@link IsIntOptions}
 * for the options configuration details.
 * 
 * See {@link isInt} for a description of the method
 * performing the validation.
 * 
 * @param IsIntOptions The configuration interface for the options.
 * @param validationOptions The validation options
 */
export function IsIntString(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsIntString.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isInt} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isInt}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  console.log(`isInt for ${o[vc.propertyName]} is ${!!isInt(o[vc.propertyName], {}).value}`)
  return !!isInt(o[vc.propertyName], {}).value;
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isInt(v,{}).value ) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isInt}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be an integer";
  return  errorMessageTemplate(vc, o, messageLiteral)
}
