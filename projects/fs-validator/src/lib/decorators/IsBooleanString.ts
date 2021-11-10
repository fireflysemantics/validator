import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isBooleanString } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a boolean string.
 * 
 * ### Example
 * ```
 * class IsBooleanDemo {
 *       @IsBoolean()
 *       b:boolean = true
 * }
 * ```  
 * 
 * @param validationOptions The validation options
 */
export function IsBooleanString(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should be a boolean string"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsBooleanString.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage(messageFunction),
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isBooleanString} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is valid, false otherwise.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isBooleanString(o[vc.propertyName].value);
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
    if (!isBooleanString(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}