import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isArrayContainerOf } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * The {@link IsArrayContainerOf} decorator 
 * checks if the `target` argument array
 * values are contained by the decorated property.  
 * 
 * @param validationOptions The validation options
 */
export function IsArrayContainerOf(target: any[], validationOptions?: ValidationOptions) {

  function messageFunction(vc: ValidationContext) {
    return "should be a container of the target array"
  }

  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsArrayContainerOf.name,
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
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is in the target array.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !!isArrayContainerOf(o[vc.propertyName], target).value;
}