import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isHexColor } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value is a hex color.  
 * 
 * ### Example
 *``` 
 * class IsHexColorDemo {
 *       @IsHexColor() 
 *       e:string = 'deadBEEF'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsHexColor(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should be a hex color"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsHexColor.name,
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
 * Value is valid if it passes the {@link isHexColor} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isHexColor}
 */
export function validateValue(vc: ValidationContext, o: any): boolean {
  return !!isHexColor(o[vc.propertyName]).value;
}

/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc: ValidationContext, values: any[]): Array<Number> {
  const errorIndex: Array<Number> = [];
  values.forEach((v, i) => {
    if (!isHexColor(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}