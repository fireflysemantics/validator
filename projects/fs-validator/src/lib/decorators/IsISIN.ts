import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isISIN } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a ISIN (stock/security identifier).  
 * 
 * ### Example
 *``` 
 * class IsISINDemo {
 *     @IsISIN() 
 *     alpha:any = 'AU0000XVGZA3'
 * }
 * ```
 * @param validationOptions The validation options
 */
export function IsISIN(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a ISIN (stock/security identifier)"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsISIN.name,
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
 * Value is valid if it passes the {@link isISIN} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isISIN}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isISIN(o[vc.propertyName]).value;
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
    if (!isISIN(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}