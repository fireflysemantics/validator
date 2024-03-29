import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isByteLength } from "@fireflysemantics/validatorts";
import { isDefined } from "@fireflysemantics/validatorts"; 
import { errorMessage } from "..";

/**
 * Decorator that checks if the string byte length
 * is in range.
 * 
 * ### Example
 *``` 
 * class IsByteLengthDemo {
 *       @IsByteLength(0, 4) 
 *       alpha:string= 'abc'
 *}
 * ```
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsByteLength(min: number, max?: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(min);
    if (isDefined(max).value) {
      validationParameters.push(max);
    }
    else {
      validationParameters.push(Infinity);
    }

    function messageFunction(vc: ValidationContext) {
      return `byte length should in range [${vc.validationParameters[0]}-${vc.validationParameters[1]}]`
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsByteLength.name,
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
 * Value is valid if it passes the {@link isByteLength} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isByteLength}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const min:number = vc.validationParameters[0];
  const max:number = vc.validationParameters[1];
  const options = {min, max}
  return !!isByteLength(o[vc.propertyName], options).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const min:number = vc.validationParameters[0];
  const max:number = vc.validationParameters[1];
  const options = {min, max}
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isByteLength(v, options).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}