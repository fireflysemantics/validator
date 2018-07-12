import { ValidationError } from "@fireflysemantics/container/error/ValidationError";
import { getValidationContextContainerKey } from "@fireflysemantics/utilities/utilities";
import { IValidationErrorIndex} from '@fireflysemantics/container/error/IValidationErrorIndex'

/**
 * Validation error container holding all validation errors.
 */
export class ErrorContainer {

  /**
   * The index for all of the ValidationContext instances.
   */
  static cache: IValidationErrorIndex = {};

  /**
   * If the context array is absent it is created, otherwise
   * the context is placed at the end of the existing context array.
   * @param key 
   * @param context 
   */
  private static pushtIfAbsent(key: string, error: ValidationError):void {
    if (this.cache[key] == null) {
      const validationContextArray: Array<ValidationError> = [];
      validationContextArray.push(error);
      this.cache[key] = validationContextArray;
    } else {
      this.cache[key].push(error);
    }
  }

  /**
   * @param ve Add a ValidationContext instance.
   */
  public static addValidationError(ve: ValidationError) {
    const key: string = getValidationContextContainerKey(
      ve.vc.target.name,
      ve.vc.propertyName
    );
    this.pushtIfAbsent(key, ve);
  }

  /**
   * Gets a ValidationContext instance from the container.
   * @param key Key used to get the ValidationContext instance.
   * @returns Array<ValidationErrors> The array of validation errors 
   */
  public static getValidationErrors(key: string): Array<ValidationError> {
    return ErrorContainer.cache[key];
  }
}

/**
 * Helper methods for the error container.
 */
export class ErrorContainerHelper {
 /**
   * Gets all ErrorContainer keys.
   * @returns All the error container keys
   */
  public static getErrorContainerKeys(key: string): Array<string> {
    return Object.keys(<any> ErrorContainer.cache);
  }

  /**
   * Gets all ErrorContainer values.
   * @returns All the error container values
   */
  public static getErrorContainerValues(): Array<Array<ValidationError>> {
    return Object.values(<any> ErrorContainer.cache);
  }      
}