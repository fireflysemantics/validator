import { ValidationOptions } from "../../src/container/validation/ValidationOptions";
import { ValidationContext } from "../../src/container/validation/ValidationContext";
import { ValidationContainer } from "../../src/container/validation/ValidationContainer";
import { PREFIX_EACH, PREFIX_SINGLE } from "../../src/constants";

/**
 * Function that always returns true regardless
 * of the argument.
 *
 * @param value
 */
function isAlwaysTrue(value: any) {
  return true;
}

/**
 * Decorator that checks on the property value.
 * Always return true.
 *
 * See {@link isAlwaysTrue} for a description of the method
 * performing the validation.
 *
 * @param validationOptions The validation options
 */

/**
 * Used to perform checks that should be true across
 * all decorator use cases.
 */
export function Core2(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const vc = new ValidationContext(
      object, //decorator
      object.constructor, //Decorator constructor
      Core2.name, //Decorator name
      propertyName,
      isAlwaysTrue, //Always valid
      () => [],
      true, //Stop in the even the validation fails
      errorMessage,
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * The core default error message example function.
 * @param vc The ValidationContext
 * @param o The object being validated
 * @return The error message.
 */
function errorMessage(vc: ValidationContext, o: any): string {
  const messageLiteral: string = "must be valid";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
