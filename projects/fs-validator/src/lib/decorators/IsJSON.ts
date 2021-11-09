import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isJSON } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a string.  
 * 
 * See {@link isJSON} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsJSON(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a valid JSON"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsJSON.name,
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
 * Value is valid if it passes the {@link isJSON} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isJSON}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isJSON(o[vc.propertyName], {}).value;
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
    if (!isJSON(v,{})) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}
