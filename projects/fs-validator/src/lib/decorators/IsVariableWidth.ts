import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isVariableWidth } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that check if the property contains any half-width chars.  
 * 
 * See {@link isVariableWidth} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsVariableWidth(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should contain variable width characters";      
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsVariableWidth.name,
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
 * Value is valid if it passes the {@link isVariableWidth} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isVariableWidth}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isVariableWidth(o[vc.propertyName]).value;
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
    if (!isVariableWidth(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}