import { isString } from "@fireflysemantics/validatorts";
import { PREFIX_EACH, PREFIX_SINGLE, ValidationContext } from ".";

/**
 * Creates the validation context key used to
 * lookup the array of ValidationContext instances.
 * 
 * ### Example
 * For a class name `Order` of the instance being
 * validated and the property
 * `date` the value return is `Order_date`.
 * 
 * ```ts
 * getPropertyKey('Order', 'date')//returns `Order_date`.
 *
 * @param target The object or name of the object constructor
 * @param propertyName
 * @return The key for the array of ValidationContext instances.
 */
export function getPropertyKey(
  target: string | any,
  propertyName: string
): string {
  return isString(target).value
    ? `${target}_${propertyName}`
    : `${target.constructor.name}_${propertyName}`;
}

/**
 * The signature for the decorator, class,
 * and class property combination.
 *
 * 
 * ### Example
 * 
 * The {@link ValidationContext} signature formed from the
 * {@link IfValid} annotation applied to the `purchasePrice`
 * property of a `SalesOrder` instance.
 *
 * ```ts
 * IfValid_SalesOrder_purchasePrice
 * ```
 */
export function getValidationContextSignature(
  decorator: string,
  targetName: string,
  propertyName: string
): string {
  return `${decorator}_${targetName}_${propertyName}`;
}


/**
 * Generic message template function.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @param messageLiteral The message literal
 * @return The error message. 
 */
export function errorMessageTemplate(vc: ValidationContext, o: any, messageLiteral: string): string {
  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName}, ${o[vc.propertyName]}, ${messageLiteral}`;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link isAfterInstant}.
 * 
 * @param vc The validation context
 * @param messageFunction The message literal
 * @return The error message. 
 */
export function errorMessage(messageFunction: (vc:ValidationContext)=>string) {
  /**
   * The generated error message string indicating 
   * that the value is not valid according to {@link isAfterInstant}.
   * 
   * @param vc The validation context
   * @param o The object being validated
   * @return The error message. 
   */
  return function errorMessage(vc: ValidationContext, o: any): string {
    return errorMessageTemplate(vc, o, messageFunction(vc))
  }
}