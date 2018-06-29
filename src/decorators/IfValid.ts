import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { validateProperty } from "@fireflysemantics/utilities/utilities";
/**
 * Checks if the propertyName value attached to the 
 * property name provided passes the validation checks
 * of all decorators attached to that property.
 * 
 * If the checks to not pass then this decorator stops the validation
 * process for this specific property.
 */
export function IfValid(target: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const validationParameters:any[] = [];
    validationParameters.push(target);

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IfValid.name,
      propertyName,
      validateValue,
      null,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
    ValidationContainer.addValidationContext(vc);
  };
}

function validateValue(vc:ValidationContext, o:any) {
  const propertyName = vc.validationParameters[0];
  return validateProperty(o, propertyName);
}

function errorMessage(vc: ValidationContext, value: any):string {
  const messageLiteral: string = "should not be null or undefined";

  if (value instanceof Array) {
    return `${vc.propertyName} ${messageLiteral}`;
  }
  return `The value contained by ${vc.propertyName} ${messageLiteral}`;
}
