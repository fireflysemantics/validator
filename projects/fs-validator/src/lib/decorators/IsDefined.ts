import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isDefined } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * 
 * Decorator that checks if the property is defined
 * (Not null or undefined).
 * 
 * ### Example
 *``` 
 * class IsDefinedDemo {
 *       @IsDefined() 
 *       d:any = 'defined'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsDefined(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should not be null or undefined"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsDefined.name,
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
 * Value is valid if it passes the {@link isDefined} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is not null or undefined, false otherwise.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const result = isDefined(o[vc.propertyName]).value 
  if (result) {
    return result
  } 
  return false;
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
    if (!isDefined(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}