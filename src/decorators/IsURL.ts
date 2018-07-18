import { PREFIX_EACH, PREFIX_SINGLE } from "@fs/constants";
import { ValidationOptions } from "@fs/container/validation/ValidationOptions";
import { ValidationContext } from "@fs/container/validation/ValidationContext";
import { ValidationContainer } from "@fs/container/validation/ValidationContainer";
import { isURL } from "@fireflysemantics/is";

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
export function IsURL(options?: ValidatorJS.IsURLOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsURL.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      null,
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
  return isURL(o[vc.propertyName], vc.validationTypeOptions);
}

/**
 * @param vc The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isURL(v, vc.validationTypeOptions)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isURL}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should be a URL";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
