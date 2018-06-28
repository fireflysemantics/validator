import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import {
  IValidationContextsIndex,
  IValidationContextIndex
} from "@fireflysemantics/container/validation/IValidationContextIndex";

/**
 * Validation container holding all validation contexts
 * created by the validation decorators.
 */
export class ValidationContainer {
  /**
   * The index for all of the ValidationContext instances.
   * Not meant to be accessed directly.  Only decorators should
   * be modifying the state of the cache by using the addValidationContext() method.
   */
  static cache: IValidationContextsIndex = {};

  /**
   * @param vc Add a ValidationContext instance.
   */
  public static addValidationContext(vc: ValidationContext): void {
    const key: string = getValidationContextKey(
      vc.target.name,
      vc.propertyName
    );
    ValidationContainerHelper.setIfAbsent(key, vc);
  }

  /**
   * @returns All the validation context keys (decorator_target_property name based keys)
   */
  public static getValidationContextKeys(
    vci: IValidationContextsIndex
  ): Array<string> {
    return Object.keys(<any>vci);
  }

  /**
   * Gets all ValidationContext container values fpr a
   * Object_property string valued key or a key that is an instance of
   * IValidationContextIndex).
   * @returns An array of ValidationContext instances contained in the cache that corresponds to a specific Object_property key or null if it does not exist.
   */
  public static getValidationContextValues(key: any): null | Array<ValidationContext> {
    if (typeof key === `string`) {
      const vci = ValidationContainer.cache[<string>key];
      return vci ? Object.values(<any>vci) : null;
    } else {
      return Object.values(<IValidationContextIndex>key);
    }
  }
}

/**
 * This class limits the interface / api
 * of the ValidationContainer to a few public methods and enables us to
 * make method that would be private public so that we can unit test them.
 *
 * Additional methods that are not part of the core implementation
 * allow us test aspects of the containers runtime
 * behavior and state.
 */
export class ValidationContainerHelper {
  /**
   * If the ValidationContext instance is absent it is created, otherwise
   * the context is placed in the cache specific to the class decorated.
   * @param key
   * @param vc
   * @throws Error if attempting to add a ValidationContext that has already been added
   *
   * The exception thrown indicates that duplicate class definition exist in the runtime.
   */
  public static setIfAbsent(key: string, vc: ValidationContext): void {
    if (ValidationContainer.cache[key] == null) {
      const validationContextMap: IValidationContextIndex = {};
      validationContextMap[vc.getSignature()] = vc;
      ValidationContainer.cache[key] = validationContextMap;
    } else {
      if (ValidationContainer.cache[key][vc.getSignature()]) {
        throw new Error(
          `The ValidationContainer already contains context with signature ${vc.getSignature()}.`
        );
      }
      ValidationContainer.cache[key][vc.getSignature()] = vc;
    }
  }
  /**
   * Gets a ValidationContext instance from the container.
   * @param key Key used to get the ValidationContext instance.
   * @returns An object based cache containing the ValidationContext instances.
   */
  public static getValidationContextIndex(
    key: string
  ): IValidationContextIndex {
    return ValidationContainer.cache[key];
  }

  /**
   * @returns All the validation container keys (Object_property based keys)
   */
  public static getValidationContainerKeys(key: string): Array<string> {
    return Object.keys(<any>ValidationContainer.cache);
  }
  /**
   * Gets all ValidationContext container values.
   * @returns All the validation context values
   */
  public static getValidationContainerValues(): Array<IValidationContextIndex> {
    return Object.values(<any>ValidationContainer.cache);
  }
}
