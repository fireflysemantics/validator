import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isBase64 } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the value is base 64 encoded.  
 * 
 * ### Example
 * ```
 * class IsBase64Demo {
 *       @IsBase64()
 *       p0: string = 'Zg=='
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsBase64(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should be base 64 encoded"
    }
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsBase64.name,
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
 * Value is valid if it passes the {@link isBase64} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isBase64}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isBase64(o[vc.propertyName]).value;
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
    if (!isBase64(v)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}