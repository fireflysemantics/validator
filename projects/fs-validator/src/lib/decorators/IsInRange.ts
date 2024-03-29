import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isInRange, isDefined } from "@fireflysemantics/validatorts"; 
import { errorMessage } from "..";

/**
 * Decorator that checks if the number
 * is in range.
 * 
 * ### Example
 *``` 
 * class IsInRangeDemo {
 *       @IsInRange(0,1) 
 *       e:number= 0.5
 * }
 * ```
 * 
 * @param min The minimum length.
 * @param max The maximum length.
 * @param validationOptions The validation options
 */
export function IsInRange(min: number, max?: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(min);
    if (isDefined(max)) {
      validationParameters.push(max);
    }
    else {
      validationParameters.push(Infinity);
    }

    function messageFunction(vc: ValidationContext) {
      return `length should in range [${vc.validationParameters[0]}-${vc.validationParameters[1]}]`
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsInRange.name,
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
 * Value is valid if it passes the {@link length} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link length}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const min:number = vc.validationParameters[0];
  let max = null;
  if (vc.validationParameters[1] !== undefined) {
    max = vc.validationParameters[1];
  }
  return !!isInRange(o[vc.propertyName], min, max).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const min:number = vc.validationParameters[0];
  let max:number;
  if (vc.validationParameters[1] !== undefined) {
    max = vc.validationParameters[1];
  }
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isInRange(v, min, max)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}