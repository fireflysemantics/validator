import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayEmpty } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property array is not empty.  
 * 
 * ### Example
 * ```
 * class IsArrayInDemo {
 *     @IsArrayIn([1,2,3])
 *      p0: any[] = [1,2]
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsArrayNotEmpty(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should not be an empty array"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayNotEmpty.name,
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
 * Value is valid if it passes the {@link IsArrayNotEmpty} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link IsArrayNotEmpty}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !isArrayEmpty(o[vc.propertyName]).value;
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
    if (!!isArrayEmpty(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}
