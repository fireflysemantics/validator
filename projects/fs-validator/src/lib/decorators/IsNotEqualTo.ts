import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isNotEqualTo } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is not equal to the argument.  
 * 
 * ### Example
 *``` 
 * class IsNotEqualTo {
 *     @IsNotEqualTo(1) 
 *     alpha:any = '2'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsNotEqualTo(target: any, validationOptions?: ValidationOptions) {

  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should not equal the target"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsNotEqualTo.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage(messageFunction),
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isNotEqualTo} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value does not equal the target.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !!isNotEqualTo(o[vc.propertyName], target).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const target:any = vc.validationParameters[0];

  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isNotEqualTo(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}