import { ValidationError } from "./ValidationError";
import { getObjectPropertyKey } from "../../utilities/utilities";

/**
 * Validation error container holding all validation errors.
 */
export class ErrorContainer {

  /**
   * The index for all of the ValidationError instances.
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
      const vea: Array<ValidationError> = [];
      vea.push(error);
      this.cache[key] = vea;
    } else {
      this.cache[key].push(error);
    }
  }

  /**
   * @param ve The ValidationError instance.
   */
  public static addValidationError(ve: ValidationError) {
    const key: string = getObjectPropertyKey(
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

 /**
   * Gets all ErrorContainer keys.
   * @returns All the error container keys
   */
  public static getErrorContainerKeys(key: string): Array<string> {
    return Object.keys(ErrorContainer.cache);
  }

  /**
   * Gets all ErrorContainer values.
   * @returns All the error container values
   */
  public static getErrorContainerValues(): Array<Array<ValidationError>> {
    return Object.values(ErrorContainer.cache);
  }
  
  /**
   * 
   */
  public static clear(): void {
    ErrorContainer.cache = {};
  }
}

/**
 * Interface representing the ValidationError cache.
 */
export interface IValidationErrorIndex {
  [errorKey: string]: Array<ValidationError>;
}