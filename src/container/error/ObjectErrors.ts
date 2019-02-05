import { ValidationError } from "./ValidationError";
import { getObjectPropertyKey } from "../../utilities/utilities";

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
  cache: IErrorIndex = {};

  /**
   * If the context array is absent it is created, otherwise
   * the context is placed at the end of the existing context array.
   * @param key 
   * @param context 
   */
  private pushIfAbsent(key: string, error: ValidationError):void {
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
  public addValidationError(ve: ValidationError) {
    const key: string = getObjectPropertyKey(
      ve.vc.target.name,
      ve.vc.propertyName
    );
    this.errors.push(ve);
    this.pushIfAbsent(key, ve);
  }

  /**
   * Get the {@link ValidationError} instances for
   * the key (See {@link getObjectPropertyKey}) parameter .
   * 
   * @param key The {@link getObjectPropertyKey} key.
   * @returns Array<ValidationErrors> The array of validation errors 
   */
  public getErrors(key: string): Array<ValidationError> {
    return this.cache[key];
  }
}

/**
 * Interface representing the ValidationError cache.
 */
export interface IErrorIndex {
  [errorKey: string]: Array<ValidationError>;
}