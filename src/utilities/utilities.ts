import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ErrorContainer } from "@fireflysemantics/container/error/ErrorContainer";
import { ValidationError } from "@fireflysemantics/container/error/ValidationError";
import { IValidationContextIndex } from "@fireflysemantics/container/validation/IValidationContextIndex";

/**
 * Constant string literal used for message completion
 * when property values are stored in arrays.
 */
export const EACH:string = "Each value in";

/**
 * @param value The value being checked to ensure that it is not null or undefined.
 * @returns boolean True if the value is not null or undefined, false otherwise.
 *
 * See https://stackoverflow.com/questions/51003292/exporting-utility-functions-in-typescript/51004236#51004236
 * for an implementation reference.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null; //This checks for undefined automatically.
}

/**
 * Creates the validation context key used to lookup the validation context for the property.
 * @param constructorName
 * @param propertyName
 * @return string The validation context key.
 */
export function getValidationContextKey(
  constructorName: string,
  propertyName: string
): string {
  return `${constructorName}_${propertyName}`;
}

export function validate(o: Array<any> | any): void {
  if (Array.isArray(o)) {
    o.forEach(element => {
      console.log(element);
    });
  } else {
  }
}

/**
 * Validates a property contained on the object.
 * Errors are added to the ErrorContainer.
 * @param o The object being validated
 * @param propertyName The name of the property holding the value being validated
 * @return True if the property is valid, false otherwise.
 */
export function validateProperty(o: any, propertyName: string): boolean {
  let valid = true;
  const key = getValidationContextKey(o.constructor.name, propertyName);
  const vci = ValidationContainer.getValidationContextValues(key);

  const propertyValue = o[propertyName];

  vci.every((vc:ValidationContext)=> {
    const ve:ValidationError = new ValidationError(o, vc, propertyValue);
    if (propertyValue instanceof Array) {
      propertyValue.forEach((v:any, index:Number)=>{
        if (!vc.validate(v)) {
          ve.addErrorIndex(index);
          ErrorContainer.addValidationError(ve);
          valid = false;
        }
      });
    }
    else {
      if (!vc.validate(propertyValue)) {
        ErrorContainer.addValidationError(ve);
        valid = false;
      }
    }
    if (!valid && vc.stop) {
      return false;
    }
    else return true;
  });
  return valid;
}

   /**
* The signature for the decorator, class, and class property 
* combination.
*/
export function getValidationContextSignature(decorator: string, targetName:string, propertyName:string):string {
 return `${decorator}_${targetName}_${propertyName}`;
}
