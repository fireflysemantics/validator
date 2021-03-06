import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNumber,IsNumberOptions  } from "@fireflysemantics/is";

/**
 * Decorator that checks if the property is a Number.  
 * 
 * See {@link IsNumberOptions}
 * for the options configuration details.
 * 
 * See {@link isNumber} for a description of the method
 * performing the validation.
 * 
 * @param IsNumberOptions The configuration interface for the options.
 * @param validationOptions The validation options
 */
export function IsNumber(options: IsNumberOptions = {}, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNumber.name,
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
 * Value is valid if it passes the {@link isNumber} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isNumber}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return isNumber(o[vc.propertyName], vc.validationTypeOptions);
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isNumber(v, vc.validationTypeOptions)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isNumber}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should be a number";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
