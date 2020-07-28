import { isString } from "@fireflysemantics/is";

/**
 * Creates the validation context key used to
 * lookup the array of ValidationContext instances.
 * 
 * For example if the class name of the instance being
 * validated is `Order` and the property being validated is
 * `date` then the value return is `Order_date`.
 * 
 * @example 
 * ```ts
 * getValidationContextContainerKey('Order', 'date')//returns `Order_date`.
 *
 * @param target The object or name of the object constructor
 * @param propertyName
 * @return The key for the array of ValidationContext instances.
 */
export function getPropertyKey(
  target: string | any,
  propertyName: string
): string {
  return isString(target)
    ? `${target}_${propertyName}`
    : `${target.constructor.name}_${propertyName}`;
}

/**
 * The signature for the decorator, class,
 * and class property combination.
 *
 * Below is a getValidationContextSignature 
 * example of what would be produced
 * when the {@link ValidationContext} were formed from the
 * {@link IfValid} annotation applied to the `purchasePrice`
 * property of a `SalesOrder` instance.
 *
 * @example
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
