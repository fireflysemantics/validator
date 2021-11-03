import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isInRange, isDefined } from "@fireflysemantics/validatorts"; 

/**
 * Decorator that checks if the string length
 * is in range.  
 * 
 * See {@link isLengthInRange} for a description of the method
 * performing the validation.
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

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsInRange.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
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

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link length}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `length should in range [${vc.validationParameters[0]}-${vc.validationParameters[1]}]`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
