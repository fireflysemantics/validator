import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isISBN } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value
 * is an ISBN number.  
 * 
 * See {@link isISBN} for a description of the method
 * performing the validation.
 * 
 * @param entity The enum the value is being checked against.
 * @param validationOptions The validation options
 */
export function IsISBN(target: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(target);

    function messageFunction(vc: ValidationContext) {
      return "should be an ISBN number"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsISBN.name,
      propertyName,
      validateValue,
      validateArray,
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
 * Value is valid if it passes the {@link isISBN} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isISBN}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  let target:any = null;
  if (vc.validationParameters[0] !== undefined) {
    target = vc.validationParameters[0];
  }
  return !!isISBN(o[vc.propertyName], target).value;
}

/**
 * @param vc The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  let target:any = null;
  if (vc.validationParameters[0] !== undefined) {
    target = vc.validationParameters[0];
  }
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!isISBN(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}