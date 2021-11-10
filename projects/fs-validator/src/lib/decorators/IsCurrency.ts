import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isCurrency, IsCurrencyOptions } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is currency amount.  
 * 
 * ### Example
 *``` 
 * class IsCurrencyDemo {
 *       @IsCurrency() 
 *       currency:string = '33.30'
 * }
 * ```
 * @param validationOptions The validation options
 */
export function IsCurrency(options?: IsCurrencyOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a real currency amount"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsCurrency.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      undefined,
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isCurrency} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isCurrency}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isCurrency(o[vc.propertyName], vc.validationTypeOptions).value;
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
    if (!isCurrency(v, vc.validationTypeOptions).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}