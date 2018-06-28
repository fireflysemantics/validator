import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";

/**
 * Used to perform checks that should be true across 
 * all decorator use cases.
 */
export function Core(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    const vc = new ValidationContext(
      object, //decorator
      object.constructor, //Decorator constructor
      Core.name, //Decorator name
      propertyName,
      () => true, //Always valid
      true, //Stop in the even the validation fails
      errorMessage,
      validationOptions);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * The core sample default error message function.
 * Uses the message similar to the IsDefined validation.
 * @param vc The ValidationContext
 * @param value The value(s) (Could be an array) being validated
 */
function errorMessage(vc: ValidationContext, value:any):string {
  const propertyName = vc.propertyName;
  return `Value(s) assigned to ${propertyName} must be defined.`
}
