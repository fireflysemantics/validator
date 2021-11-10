import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isInstanceOf } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is an instance of the target argument.  
 * 
 * ### Example
 *``` 
 * class IsInstanceOfDemo {
 *       @IsInstanceOf(Date) 
 *       e:Date= new Date()
 * }
 * ```
 * 
 * @param target The target constructor that the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsInstanceOf(target: any, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return `should be an instance of ${vc.validationParameters[0]}`
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsInstanceOf.name,
      propertyName,
      validateValue,
      validateArray,
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
 * Value is valid if it passes the {@link isInstanceOf} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isInstanceOf}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !!isInstanceOf(o[vc.propertyName], target).value;
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const target:any = vc.validationParameters[0];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isInstanceOf(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}