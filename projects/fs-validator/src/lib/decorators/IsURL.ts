import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isURL, IsURLOptions } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value a URL.  
 * 
 * See {@link ValidatorJS.IsURLOptions}
 * for the options configuration details.
 * 
 * See {@link isURL} for a description of the method
 * performing the validation.
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsURL(options?: IsURLOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {


    function messageFunction(vc: ValidationContext) {
      return "should be a URL"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsURL.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      undefined,
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isURL} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isURL}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isURL(o[vc.propertyName], vc.validationTypeOptions).value;
}

/**
 * @param vc The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isURL(v, vc.validationTypeOptions).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}