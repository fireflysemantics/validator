import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isIP } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property value
 * is an IP.
 * 
 * @param version The IP version (Optional: 4 or 6).
 * @param validationOptions The validation options
 */
export function IsIP(version?: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(version);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsIP.name,
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
 * Value is valid if it passes the {@link isIP} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isIP}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  let target:4|6 = vc.validationParameters[0];
  if (target) {
    return !!isIP(o[vc.propertyName], target.toString()).value;
  }
  return !!isIP(o[vc.propertyName]).value;
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
    const target:4|6 = vc.validationParameters[0];
  }
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isIP(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isIP}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be an IP address";
  return  errorMessageTemplate(vc, o, messageLiteral)
}
