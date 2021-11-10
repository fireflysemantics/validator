import { ValidationOptions } from "../ValidationOptions"
import { ValidationContext } from "../ValidationContext"
import { ValidationContainer } from "../ValidationContainer"
import { isInArray } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property value
 * is not in array of allowed values.  
 * 
 * ### Example
 *``` 
 * class IsValueNotInDemo {
 *       @IsValueNotIn([2,2]) alpha:number = 1
 * }
 * ```
 * @param target The array of allow values
 * @param validationOptions The validation options
 */
export function IsValueNotIn(
  target: any[], 
  validationOptions?: ValidationOptions) {

  const validationParameters:any[] = []
  validationParameters.push(target)

  return function(object: any, propertyName: string) {

    function messageFunction(vc: ValidationContext) {
      return "should not be in the target array"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsValueNotIn.name,
      propertyName,
      validateValue,
      undefined,
      true,
      errorMessage(messageFunction),
      validationOptions,
      validationParameters
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
  return !isInArray(o[vc.propertyName], target).value
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
    if (!!isInArray(v, target).value) {
      errorIndex.push(i)
    }
  })
  return errorIndex
}