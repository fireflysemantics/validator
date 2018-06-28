import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { EACH, isDefined } from "@fireflysemantics/utilities/utilities";

/**
 * Checks if given value is defined (!== undefined, !== null).
 */
export function IsDefined(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsDefined.name,
      propertyName,
      isDefined,
      true,
      errorMessage,
      validationOptions
    );
    ValidationContainer.addValidationContext(vc);
  };
}

function errorMessage(vc: ValidationContext, value: any):string {
  const messageLiteral: string = "should not be null or undefined";

  if (value instanceof Array) {
    return `${EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `The value contained by ${vc.propertyName} ${messageLiteral}`;
}
