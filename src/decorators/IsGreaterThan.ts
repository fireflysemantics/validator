import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { isGreaterThan } from "@fireflysemantics/is";

/**
 * Decorator that checks if the property value
 * is greater than the argument.  
 * 
 * See {@link isGreaterThan} for a description of the method
 * performing the validation.
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsGreaterThan(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsGreaterThan.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isGreaterThan} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isGreaterThan}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:number = vc.validationParameters[0];
  return isGreaterThan(o[vc.propertyName], target);
}
/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const target:number = vc.validationParameters[0];
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isGreaterThan(v, target)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isGreaterThan}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `should be greater than ${vc.validationParameters[0]}`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
