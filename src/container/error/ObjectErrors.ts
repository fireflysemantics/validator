import { ValidationError } from "@fs/container/error";
import { getPropertyKey } from "@fs/utilities/utilities";

/**
 * Validation error container holding all validation errors.
 */
export class ObjectErrors {

  /**
   * If valid is true, there are no errors and the 
   * errors array will be empty.
   */
  valid: boolean = true;

  /**
   * The array of {@link ValidationError} instances.
   */
  errors: Array<ValidationError> = [];

  /**
   * The property name index for all of the ValidationError instances.
   */
  cache: Map<string, Array<ValidationError>> = new Map();

  /**
   * If the context array is absent it is created, otherwise
   * the context is placed at the end of the existing context array.
   * @param key The signature used to lookup the array of `ValidationError` instances.
   * @param error The `ValidationError` instance 
   */
  private push(key: string, error: ValidationError):void {
    if (this.cache.get(key) == null) {
      const vea: Array<ValidationError> = [];
      vea.push(error);
      this.cache.set(key, vea);
    } else {
      this.cache.get(key).push(error);
    }
  }

  /**
   * @param ve The ValidationError instance.
   */
  public addValidationError(ve: ValidationError) {
    const key: string = getPropertyKey(
      ve.vc.target.name,
      ve.vc.propertyName
    );
    this.errors.push(ve);
    this.push(key, ve);
  }

  /**
   * Get the {@link ValidationError} instances for
   * the key (See {@link getObjectPropertyKey}) parameter .
   * 
   * @param key The {@link getObjectPropertyKey} key.
   * @returns Array<ValidationErrors> The array of validation errors 
   */
  public getErrors(key: string): Array<ValidationError> {
    return this.cache.get(key);
  }

  /**
   * Get the properties that have errors.
   * @return Array of properties that are invalid.
   */
  public getPropertiesWithErrors():string[] {
    return Array.from(this.cache.keys());
  }
}