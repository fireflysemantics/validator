import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNotEmpty } from "@fireflysemantics/validatorts";
import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";

/**
 * Decorator that checks if the property 
 * is not empty ((!== '', !== null, !== undefined)).  
 * 
 * See {@link isNotEmpty} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNotEmpty.name,
      propertyName,
      validateValue,
      null,
      true,
      errorMessage,
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isNotEmpty} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is not empty, false otherwise.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isNotEmpty(o[vc.propertyName]).value;
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
    if (!isNotEmpty(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isNotEmpty}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should not be empty";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
