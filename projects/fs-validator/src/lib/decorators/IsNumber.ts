import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNumber,IsNumberOptions  } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a Number.
 * 
 * ### Example
 *``` 
 * class IsNumberDemo {
 *     @IsNumber() 
 *     alpha:number = 2 
 * }
 * ```
 * 
 * @param IsNumberOptions The configuration interface for the options.
 * @param validationOptions The validation options
 */
export function IsNumber(options: IsNumberOptions = {}, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a number"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNumber.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      undefined,
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isNumber} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isNumber}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isNumber(o[vc.propertyName], vc.validationTypeOptions).value;
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
    if (!isNumber(v, vc.validationTypeOptions).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}