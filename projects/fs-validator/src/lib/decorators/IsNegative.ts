import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNegative } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is negative.  
 * 
 * ### Example
 *``` 
 * class IsNegativeDemo {
 *     @IsNegative() 
 *     alpha:any = -1
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsNegative(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be negative"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNegative.name,
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
 * Value is valid if it passes the {@link isNegative} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isNegative}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isNegative(o[vc.propertyName]).value;
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
    if (!isNegative(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}