import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isMilitaryTime } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the value is in military time format.  
 * 
 * ### Example
 *``` 
 * class IsMilitaryTimeDemo {
 *     @IsMilitaryTime() 
 *     @IsMilitaryTime() alpha:any = '22:10'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsMilitaryTime(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be in military time format"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsMilitaryTime.name,
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
 * Value is valid if it passes the {@link isMilitaryTime} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isMilitaryTime}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isMilitaryTime(o[vc.propertyName]).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isMilitaryTime(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}