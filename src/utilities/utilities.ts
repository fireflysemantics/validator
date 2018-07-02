import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ErrorContainer } from "@fireflysemantics/container/error/ErrorContainer";
import { ValidationError } from "@fireflysemantics/container/error/ValidationError";
import { isArrayEmpty} from "@fireflysemantics/is";

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
  const vcs = ValidationContainer.getValidationContextValues(key);

  const propertyValue = o[propertyName];

  vcs.every((vc:ValidationContext)=> {
    if (propertyValue instanceof Array) {
      const result: Number[] = vc.validateArray(vc, propertyValue);
      if (!isArrayEmpty(result)) {
        const ve:ValidationError = 
              new ValidationError(vc, o, propertyName, propertyValue, result);
              ErrorContainer.addValidationError(ve);
              valid = false;    
      } 
    }
    else {
      if (!vc.validateValue(vc, o)) {
        const ve:ValidationError = 
              new ValidationError(vc, o, propertyName, propertyValue);
              ErrorContainer.addValidationError(ve);
        valid = false;
      }
    }
    if (!valid && vc.stop) {
      return false; //Stops the every loop from executing any other decorator validation contexts present
    }
    else return true; //Continue validation the property
  });
  return valid;
}

/**
 * The signature for the decorator, class, 
 * and class property combination.
 */
export function getValidationContextSignature(decorator: string, targetName:string, propertyName:string):string {
 return `${decorator}_${targetName}_${propertyName}`;
}