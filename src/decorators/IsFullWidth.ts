import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../container/validation/ValidationOptions";
import { ValidationContext } from "../container/validation/ValidationContext";
import { ValidationContainer } from "../container/validation/ValidationContainer";
import { isFullWidth } from "@fireflysemantics/is";

/**
 * Decorator that checks if the property
 * value (string) contains any full-width
 * chars is defined.  
 * 
 * See {@link isFullWidth} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsFullWidth(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsFullWidth.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isFullWidth} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isFullWidth}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return isFullWidth(o[vc.propertyName]);
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
    if (!isFullWidth(v)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link IsFullWidth}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should contain full width charachters";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
