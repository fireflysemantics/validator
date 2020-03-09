import { ValidationOptions } from "../ValidationOptions"
import { ValidationContext } from "../ValidationContext"
import { ValidationContainer } from "../ValidationContainer"
import { isNotIn } from "@fireflysemantics/is"
import { PREFIX_EACH, PREFIX_SINGLE } from "../constants"

/**
 * Decorator that checks if the property value
 * is not in array of allowed values.  
 * 
 * See {@link isNotIn} for a description of the method
 * performing the validation.
 * 
 * @param target The array of allow values
 * @param validationOptions The validation options
 */
export function IsValueNotIn(
  target: any[], 
  validationOptions?: ValidationOptions) {

  const validationParameters:any[] = []
  validationParameters.push(target)

  return function(object: any, propertyName: string) {
    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsValueNotIn.name,
      propertyName,
      validateValue,
      null,
      true,
      errorMessage,
      validationOptions
    )
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName)
    ValidationContainer.addValidationContext(vc)
  }
}

/**
 * Value is valid if it passes the {@link isNotIn} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return True if the value is not in the target array.
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const target:any = vc.validationParameters[0]
  return isNotIn(o[vc.propertyName], target)
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const target:any = vc.validationParameters[0]

  const errorIndex:Array<Number> = []
  values.forEach((v, i)=>{
    if (!isNotIn(v, target)) {
      errorIndex.push(i)
    }
  })
  return errorIndex
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link IsNotIn}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {
  const messageLiteral: string = "should not be in the target array"

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`
}
