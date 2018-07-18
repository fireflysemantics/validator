import { PREFIX_EACH, PREFIX_SINGLE } from "@fs/constants";
import { ValidationOptions } from "@fs/container/validation/ValidationOptions";
import { ValidationContext } from "@fs/container/validation/ValidationContext";
import { ValidationContainer } from "@fs/container/validation/ValidationContainer";
import { isArraySizeLessThan } from "@fireflysemantics/is";

/**
 * Decorator that checks that the size of the array property is less than the argument.  
 * 
 * See {@link isArraySizeLessThan} for a description of the method
 * performing the validation.
 * 
 * @param target The number that the array is being checked against.
 * @param validationOptions The validation options
 */
export function IsDivisibleBy(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsDivisibleBy.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isArraySizeLessThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isArraySizeLessThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const object:number = vc.validationParameters[0];
  return isArraySizeLessThan(o[vc.propertyName], object);
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const object:number = vc.validationParameters[0];
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isArraySizeLessThan(v, object)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isArraySizeLessThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `should have an array size less than ${vc.validationParameters[0]}`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}