import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isFQDN, IsFQDNOptions } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value is
 * a fully qualified domain name (e.g. example.com).  
 * 
 * See {@link isFQDN} for a description of the method
 * performing the validation.
 * 
 * @param validationOptions The validation options
 */
export function IsFQDN(options?: IsFQDNOptions, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a fully qualified domain name"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsFQDN.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      undefined,
      options
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isFQDN} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isFQDN}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isFQDN(o[vc.propertyName], vc.validationTypeOptions).value;
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
    if (!isFQDN(v, vc.validationTypeOptions).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}