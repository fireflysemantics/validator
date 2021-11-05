import { ValidationOptions } from "../ValidationOptions"
import { ValidationContext } from "../ValidationContext"
import { ValidationContainer } from "../ValidationContainer"
import { isMobilePhone, IsMobilePhoneOptions  } from "@fireflysemantics/validatorts"
import { errorMessageTemplate } from ".."

/**
 * Decorator that checks if the property is a mobile phone number.  
 * 
 * See {@link MobilePhoneLocale}
 * for the locale options.
 * 
 * See {@link isMobilePhone} for a description of the method
 * performing the validation.
 * 
 * @param target The target locale for the phone number.
 * @param validationOptions The validation options
 */
export function IsMobilePhone( target: string, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {

    const validationParameters:any[] = []
    validationParameters.push(target)  
    
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsMobilePhone.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    )
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName)
    ValidationContainer.addValidationContext(vc)
  }
}

/**
 * Value is valid if it passes the {@link isMobilePhone} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isMobilePhone}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isMobilePhone(
    o[vc.propertyName], 
    vc.validationParameters[0]).value
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = []
  values.forEach((v, i)=>{
    if (!isMobilePhone(v, vc.validationParameters[0])) {
      errorIndex.push(i)
    }
  })
  return errorIndex
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isMobilePhone}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should be a number"
  return  errorMessageTemplate(vc, o, messageLiteral)
}
