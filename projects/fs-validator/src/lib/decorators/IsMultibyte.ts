import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isMultibyte } from "@fireflysemantics/validatorts";
import { errorMessage, errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property contains multibyte characters.  
 * 
 * ### Example
 *``` 
 * class IsMultibyteDemo {
 *     @IsMultibyte() 
 *     alpha:any = 'ひらがな・カタカナ、．漢字'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsMultibyte(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should contain multibyte characters"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsMultibyte.name,
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
 * Value is valid if it passes the {@link isMultibyte} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isMultibyte}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isMultibyte(o[vc.propertyName]).value;
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
    if (!isMultibyte(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}