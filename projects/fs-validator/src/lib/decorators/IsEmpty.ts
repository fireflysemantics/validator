import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isEmpty } from "@fireflysemantics/validatorts";
import { errorMessageTemplate } from "..";

/**
 * Decorator that checks if the property is empty.  
 * 
 * See {@link isEmpty} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsEmpty(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsEmpty.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage,
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * TODO ... Add validation options
 * 
 * Value is valid if it passes the {@link isEmpty} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is empty, false otherwise.
 */
export function validateValue(vc:ValidationContext, o:any, ):boolean {
  return !!isEmpty(o[vc.propertyName], {}).value;
}

/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isEmpty(v, {}).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isEmpty}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be a empty";
  return  errorMessageTemplate(vc, o, messageLiteral)

}
