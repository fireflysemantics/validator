import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isDate } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a Date.  
 * 
 * ### Example
 *``` 
 * class IsDateDemo {
 *       @IsDate() 
 *       d:Date = new Date(0)
 * }
 * ```
 * @param validationOptions The validation options
 */
export function IsDate(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a real date"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsDate.name,
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
 * Value is valid if it passes the {@link isDate} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isDate}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isDate(o[vc.propertyName]).value;
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
    if (!isDate(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}
