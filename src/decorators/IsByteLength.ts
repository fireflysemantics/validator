import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { isByteLength } from "@fireflysemantics/is";
import { isDefined } from "@fireflysemantics/is"; 

/**
 * Decorator that checks if the string byte length
 * is in range.  
 * 
 * See {@link isByteLength} for a description of the method
 * performing the validation.
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsByteLength(min: number, max?: number, validationOptions?: ValidationOptions) {
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
      IsByteLength.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
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
  return isByteLength(o[vc.propertyName], min, max);
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const min:number = vc.validationParameters[0];
  const max:number = vc.validationParameters[1];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isByteLength(v, min, max)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isByteLength}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `byte length should in range [${vc.validationParameters[0]}-${vc.validationParameters[1]}]`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
