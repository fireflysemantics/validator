import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { isEmail, IsEmailOptions } from "@fireflysemantics/is";

/**
 * Decorator that checks if the property value is a valid email address.  
 * 
 * See {@link isEmail} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsEmail(options?: IsEmailOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsEmail.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      null,
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isEmail} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isEmail}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return isEmail(o[vc.propertyName], vc.validationTypeOptions);
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
    if (!isEmail(v, vc.validationTypeOptions)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isEmail}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = "should be a valid email address";

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
