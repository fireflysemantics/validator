import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isHalfWidth } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that check if the property contains any half-width chars.  
 * 
 * ### Example
 *``` 
 * class IsHalfWidthDemo {
 *       @IsHalfWidth() 
 *       e:string = '!"#$%&()<>/+=-_? ~^|.,@`{}[]'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsHalfWidth(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should contain half width characters"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsHalfWidth.name,
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
 * Value is valid if it passes the {@link isHalfWidth} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isHalfWidth}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isHalfWidth(o[vc.propertyName]).value;
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
    if (!isHalfWidth(v)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}