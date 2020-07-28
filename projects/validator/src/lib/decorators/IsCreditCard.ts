import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isCreditCard } from "@fireflysemantics/is";

/**
 * Decorator that checks if the value is fits the creditcard string format pattern.  
 * 
 * See {@link isCreditCard} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsCreditCard(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsCreditCard.name,
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
 * Value is valid if it passes the {@link isCreditCard} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isCreditCard}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return isCreditCard(o[vc.propertyName]);
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
    if (!isCreditCard(v)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isCreditCard}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should be a valid credit card";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
