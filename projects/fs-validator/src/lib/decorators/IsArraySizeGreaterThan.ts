import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArraySizeGreaterThan } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the size of the array property is greater than the argument.  
 * 
 * See {@link IsArraySizeGreaterThan} for a description of the method
 * performing the validation.
 * 
 * @param target The number that the array is being checked against.
 * @param validationOptions The validation options
 */
export function IsArraySizeGreaterThan(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      isArraySizeGreaterThan.name,
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
 * Value is valid if it passes the {@link isArraySizeGreaterThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isArraySizeGreaterThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const object:number = vc.validationParameters[0];
  return !!isArraySizeGreaterThan(o[vc.propertyName], object).value;
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const object:number = vc.validationParameters[0];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isArraySizeGreaterThan(v, object).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isArraySizeGreaterThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = `should have an array size greater than ${vc.validationParameters[0]}`;
  return  errorMessageTemplate(vc, o, messageLiteral)
}