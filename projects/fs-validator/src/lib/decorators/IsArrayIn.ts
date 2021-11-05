import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayContainerOf } from "@fireflysemantics/validatorts";
import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";

/**
 * Decorator that checks if the array valued property
 * is in the target array.
 *
 * @param target The target array
 * @param validationOptions The validation options
 * 
 * ### Example
 * ```
 *  class TestIsArrayIn {
 *     @IsArrayIn([1,2,3])
 *      p0: any[] = [1,2]
 *  }
 * const IAI1 = new TestIsArrayIn()
 * expect(validate(IAI1).valid).toBeTruthy()
 * ```
 */
export function IsArrayIn(target: any[], validationOptions?: ValidationOptions) {

  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayIn.name,
      propertyName,
      validateValue,
      undefined,
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
 * Value is valid if the array values
 * are in the target array.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is in the target array.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !!isArrayContainerOf(target, o[vc.propertyName] ).value;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link arrayContains}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be contained in the target array";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
