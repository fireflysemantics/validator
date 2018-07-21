import { ValidationOptions } from "./ValidationOptions";

/**
 * The type api signature for the validation function that validates single values.
 */
export type ValidationValueFunctionType = (vc: ValidationContext, object:any)=>boolean;

/**
 * The type api signature for the validation function that validates single values.
 */
export type ValidationArrayFunctionType = (vc: ValidationContext, values:Array<any>)=>Array<Number>;

/**
 * The type api signature for the error message function.
 * @param vc The validation context
 * @param o The object being validated
 */
export type ErrorMessageType = (vc: ValidationContext, o: any) => string;

/**
 * Constructor arguments used by to lookup the validation function
 * via the ValidationContainer.
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
   */
  public getSignature():string {
    return `${this.decorator}_${this.target.name}_${this.propertyName}`;
  }
}