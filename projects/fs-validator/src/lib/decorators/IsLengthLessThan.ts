import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isLessThanFinite} from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property value
 * is less than the argument.
 * 
 * See {@link isLengthLessThan} for 
 * a description of the method
 * performing the validation.
 * 
 * @param target The maximum length.
 * @param validationOptions The validation options
 */
export function IsLengthLessThan(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsLengthLessThan.name,
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
 * Value is valid if it passes the {@link isLengthLessThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isLengthLessThan }
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:number = vc.validationParameters[0];
  return !!isLessThanFinite(o[vc.propertyName], target).value;
}
/**
 * 
 * @param vc The validation context.
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

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isLengthLessThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = `should be less than ${vc.validationParameters[0]}`;
  return  errorMessageTemplate(vc, o, messageLiteral)
}
