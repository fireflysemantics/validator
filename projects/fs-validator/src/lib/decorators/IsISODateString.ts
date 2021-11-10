import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isISO8601 } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";
/**
 * Decorator that checks if the property is an ISO Date string.  
 * 
 * ### Example
 *``` 
 * class IsISODateStringDemo {
 *     @IsISODateString() 
 *     date:any = '2009-05-19'
 * }
 * ```
 * @param validationOptions The validation options
 */
export function IsISODateString(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a ISO Date string"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsISODateString.name,
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
 * Value is valid if it passes the {@link isISODateString} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isISODateString}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isISO8601(o[vc.propertyName]).value;
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
    if (!isISO8601(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}