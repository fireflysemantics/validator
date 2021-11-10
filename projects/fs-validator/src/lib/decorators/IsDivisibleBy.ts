import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isDivisibleBy } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is divisible by the argument.  
 * 
 * ### Example
 *``` 
 * class IsDivisibleByDemo {
 *       @IsDivisibleBy(2) 
 *       d:number = 10
 * }
 * ```
 * 
 * @param target The number that the value should be divisible by.
 * @param validationOptions The validation options
 */
export function IsDivisibleBy(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return `should be a divisible by ${vc.validationParameters[0]}`
    }


    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsDivisibleBy.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isDivisibleBy} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isDivisibleBy}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:number = vc.validationParameters[0];
  return !!isDivisibleBy(o[vc.propertyName], target).value;
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const target:number = vc.validationParameters[0];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isDivisibleBy(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}