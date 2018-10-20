import { ValidationOptions } from "./ValidationOptions";

/**
 * The `ValidationContext` instance for a certain annotation
 * and property combination is created when the run time loads
 * the class that has been annotated.
 * 
 * The `ValidationContext` by the validation API to perform
 * the validation of the property.
 */
export class ValidationContext {

  /**
   * An instance of the class that has been decorated.  Typescript passes
   * in this instance when the decorated class is loaded.
   */
  object: any;

    /**
   * Constructor function of the instance being validated.
   */
  target: Function;

  /**
   * Validation Decorator Function Name.
   */
  decorator: string;

  /**
   * Property of the object to be validated.
   */
  propertyName: string;

  /**
   * Function that performs the validation of single values.
   */
  validateValue: ValidationValueFunctionType;

  /**
   * Function that performs the validation of properties 
   * containing arrays.
   */
  validateArray: ValidationArrayFunctionType;

  /**
   * Whether validation should continue in the
   * event of an error.  For example is a value is undefined,
   * then there's little point trying to apply the other validators.
   */

  stop: boolean;

  /**
   * The default error message function
   */
  errorMessage: ErrorMessageType;

  /**
   * Validation options.
   */
  validationOptions?: ValidationOptions;

  /**
   * Validation constraint parameters for the validation.
   */
  validationParameters?: any[];

  /**
   * Validation options specific to the type of validation being performd.
   */
  validationTypeOptions?: any;

  /**
   * Whether validation should continue in the
   * event of an error.  For example is a value is undefined,
   * then there's little point trying to apply the other validators.
   */
  skipErrorGeneration?: boolean;

  constructor(
    object: any,
    target: Function,
    decorator: string,
    propertyName: string,
    validateValue: ValidationValueFunctionType,
    validateArray: ValidationArrayFunctionType,
    stop: boolean,
    errorMessage: ErrorMessageType,
    validationOptions?: ValidationOptions,
    validationParameters?: any[],
    validationTypeOptions?: any, 
    skipErrorGeneration?:boolean ) {
    this.object = object;
    this.target = target;
    this.decorator = decorator;
    this.propertyName = propertyName;
    this.validateValue = validateValue;
    this.validateArray = validateArray;
    this.stop = stop;
    this.errorMessage = errorMessage;
    this.validationOptions = validationOptions;
    this.validationParameters = validationParameters;
    this.validationTypeOptions = validationTypeOptions;
    this.skipErrorGeneration = skipErrorGeneration;
  }

  /**
   * The signature for the decorator, class, and class property 
   * combination.
   * 
   * Below is a getSignature example of what would be produced
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
  public getSignature():string {
    return `${this.decorator}_${this.target.name}_${this.propertyName}`;
  }
}

/**
 * The api signature for the validation function that validates a single value.
 * 
 * @param vc The validation context
 * @param object The value being validated.
 * @return The array of indices that corresponding to the values that are invalid.
 */
export type ValidationValueFunctionType = (vc: ValidationContext, object:any)=>boolean;

/**
 * The api signature for the validation function that validates multiple values.
 * 
 * @param vc The validation context
 * @param values The array of values being validated.
 * @return The array of indices that corresponding to the values that are invalid.
 */
export type ValidationArrayFunctionType = (vc: ValidationContext, values:Array<any>)=>Array<Number>;

/**
 * The api signature for the error message function.
 * @param vc The validation context
 * @param o The object being validated
 * @return The string message that the function produced.
 */
export type ErrorMessageType = (vc: ValidationContext, o: any) => string;