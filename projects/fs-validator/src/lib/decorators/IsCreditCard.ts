import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isCreditCard } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

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
    
    function messageFunction(vc: ValidationContext) {
      return "should be a valid credit card"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsCreditCard.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
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
  return !!isCreditCard(o[vc.propertyName].value);
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
    if (!isCreditCard(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}