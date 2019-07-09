import { ValidationOptions } from "@fs/container/validation/ValidationOptions";
import { ValidationContext } from "@fs/container/validation/ValidationContext";
import { ValidationContainer } from "@fs/container/validation/ValidationContainer";
import { validateProperty } from "@fs/utilities/utilities";

/**
 * Decorator that checks if the target argument is a valid property
 * before proceeding with the validation of the property that the
 * {@link IfValid} decorator decorates.
 *
 * The property p0 is not valid hence p1 will not be validated:
 * @example 
 * ```ts
   class IfValidNotTest1 {
   @IsDefined() 
   p0: any = null; //Property not valid

   @IsDefined() 
   @IfValid("p0")
   p1: any = null;
   }
   ```
 * 
 *
 * @param target The name of the property that should be valid.
 * @param validationOptions The validation options
 */
export function IfValid(target: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters: any[] = [];
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
      validationParameters,
      null,
      true
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Validation continues if the the {@link validateProperty} check
 * passes on the target property.
 * 
 * This does not generate any errors, because it will produce duplicate
 * errors.
 *
 * @param vc The validation context
 * @param o The object containing the property referenced by the validation parameter
 */
function validateValue(vc: ValidationContext, o: any) {
  const target = vc.validationParameters[0];
  return validateProperty(o, target);
}

function errorMessage(vc: ValidationContext, o: any): string {
  return `The target property ${vc.validationParameters[0]}
          has an invalid value therefore the validation of the 
          property ${vc.propertyName} will not proceed.`;
}
