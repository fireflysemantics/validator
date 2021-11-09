import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";
import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isBefore, isDate } from "@fireflysemantics/validatorts";

/**
 * Decorator that checks if the property is before the argument.
 *
 * See {@link isBeforeInstant} for a description of the method
 * performing the validation.
 *
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsBeforeInstant(
  target: Date | string,
  validationOptions?: ValidationOptions
) {
  return function(object: any, propertyName: string) {
    const validationParameters: any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsBeforeInstant.name,
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
 * Value is valid if it passes the {@link isBeforeInstant} check.
 *
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isBeforeInstant}
 */
export function validateValue(vc: ValidationContext, o: any): boolean {
  let target = vc.validationParameters[0];
  if (isDate(target).value) {
    return !!isBefore(o[vc.propertyName], target).value;
  }
  target = o[target];
  return !!isBefore(o[vc.propertyName], target).value;
}

/**
 *
 * @param vc  The validation context.
 * @param values The array of values.
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(
  vc: ValidationContext,
  values: any[]
): Array<Number> {
  const target: Date = vc.validationParameters[0];
  const errorIndex: Array<Number> = [];
  values.forEach((v, i) => {
    if (!isBefore(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating
 * that the value is not valid according to {@link isBeforeInstant}.
 *
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message.
 */
export function errorMessage(vc: ValidationContext, o: any): string {
  const messageLiteral: string = `should come before ${
    vc.validationParameters[0]
  }`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
