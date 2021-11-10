import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isIntString } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the string property is an integer.
 * 
 * ### Example
 *``` 
 * class IsIntStringDemo {
 *       @IsIntString() 
 *       e:any = '1'
 * }
 * ```
 * 
 * @param IsIntOptions The configuration interface for the options.
 * @param validationOptions The validation options
 */
export function IsIntString(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be an integer"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsIntString.name,
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
 * Value is valid if it passes the {@link isInt} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isInt}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isIntString(o[vc.propertyName], {}).value;
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
    if (!isIntString(v,{}).value ) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}