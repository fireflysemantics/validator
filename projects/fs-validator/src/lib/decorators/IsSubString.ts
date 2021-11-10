import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isSubString } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the 
 * property value is a substring
 * of the argument.
 * 
 * ### Example
 *``` 
 * class IsSubStringDemo {
 *     @IsSubString('ABC') alpha:string = 'AB'
 * }
 * ```
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsSubString(target: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return `should be a substring of ${vc.validationParameters[0]}`
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsSubString.name,
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
 * Value is valid if it is greater than the target.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isSubString}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:string = vc.validationParameters[0];
  return !!isSubString(o[vc.propertyName],target).value;
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
    if (!isSubString(v,target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}