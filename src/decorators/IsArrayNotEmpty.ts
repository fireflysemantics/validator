import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { isArrayNotEmpty } from "@fireflysemantics/is";

/**
 * Decorator that checks if the property array is not empty.  
 * 
 * See {@link isArrayNotEmpty} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsArrayNotEmpty(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayNotEmpty.name,
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
 * Value is valid if it passes the {@link IsArrayNotEmpty} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link IsArrayNotEmpty}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return isArrayNotEmpty(o[vc.propertyName]);
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
    if (!isArrayNotEmpty(v)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link IsArrayNotEmpty}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should not be an empty array";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
