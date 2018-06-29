import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
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
      () => [],
      true, //Stop in the even the validation fails
      errorMessage,
      validationOptions);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * The core default error message example function.
 * @param vc The ValidationContext
 * @param o The object being validated
 * @return The error message.
 */
function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "must be valid";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}