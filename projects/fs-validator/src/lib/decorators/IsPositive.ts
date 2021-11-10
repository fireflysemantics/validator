import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isPositiveFinite } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is positive finite.  
 * 
 * ### Example
 *``` 
 * class IsPositiveDemo {
 *     @IsPositive() alpha:any = 1
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsPositive(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be positive"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsPositive.name,
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
 * Value is valid if it passes the {@link isPositive} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isPositive}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isPositiveFinite(o[vc.propertyName]).value;
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
    if (!isPositiveFinite(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}