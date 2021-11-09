import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayContainerOf } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

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

    function messageFunction(vc: ValidationContext) {
      return "should be contained in the target array"
    }
  
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayIn.name,
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
