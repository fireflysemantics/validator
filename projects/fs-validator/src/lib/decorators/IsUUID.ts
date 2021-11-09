import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isUUID } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value
 * is less than the argument.  
 * 
 * See {@link isUUID} for a description of the method
 * performing the validation.
 * 
 * @param target The target version number [3 | 4 | 5].
 * @param validationOptions The validation options
 */
export function IsUUID(target?: 3 | 4 | 5, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return "should be a UUID";
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsUUID.name,
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
 * Value is valid if it passes the {@link isUUID} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isUUID}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  let target:any = null;
  if (vc.validationParameters[0] !== undefined) {
    const target:3 | 4 | 5 = vc.validationParameters[0];
  }
  return !!isUUID(o[vc.propertyName], target).value;
}

/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  let target:any = null;
  if (vc.validationParameters[0] !== undefined) {
    const target:3 | 4 | 5 = vc.validationParameters[0];
  }
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isUUID(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}