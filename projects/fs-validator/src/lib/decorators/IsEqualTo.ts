import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isEqualTo } from "@fireflysemantics/validatorts";
import { PREFIX_EACH, PREFIX_SINGLE } from "../constants";

/**
 * Decorator that checks if the property is equal to the argument.  
 * 
 * See {@link isEqualTo} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsEqualTo(target: any, validationOptions?: ValidationOptions) {

  const validationParameters:any[] = [];
  validationParameters.push(target);

  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsEqualTo.name,
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
 * Value is valid if it passes the {@link isEqualTo} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is equals the target.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0];
  return !!isEqualTo(o[vc.propertyName], target).value;
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const target:any = vc.validationParameters[0];

  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isEqualTo(v, target).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isEqualTo}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = `should equal to the target`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
