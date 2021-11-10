import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isLessThanFinite, isString } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value
 * is less than the argument.  
 * 
 * ### Example
 *``` 
 * class IsLessThanDemo {
 *     @IsLessThan(30) 
 *     secondNumber: number = 40;
 * }
 * 
 * class IsLessThanDemo {
 *     firstNumber: number = 10;
 *     @IsLessThan('firstNumber') 
 *     secondNumber: number = 40;
 * }
 * ```
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsLessThan(target: number | string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
       return "should be less than the target"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsLessThan.name,
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
 * Value is valid if it passes the {@link isLessThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isLessThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  let target:number | string = vc.validationParameters[0];
  if (isString(target).value) {
    target = o[target];
  }
  return !!isLessThanFinite(o[vc.propertyName], <number>target).value;
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const target:number = vc.validationParameters[0];
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isLessThanFinite(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}