import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNotSubString } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the
 * property value is not a substring
 * of the argument.  
 * 
 * ### Example
 *``` 
 * class IsNotSubStringDemo {
 *     @IsNotSubString('AB') 
 *     alpha = 'ABC'
 * }
 * ```
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsNotSubString(target: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return "should not be a substring of the target"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNotSubString.name,
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
 * Value is valid if it passes the {@link isNotSubString} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isNotSubString}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:string = vc.validationParameters[0];
  return !!isNotSubString(o[vc.propertyName],target).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const target:string = vc.validationParameters[0];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isNotSubString(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}