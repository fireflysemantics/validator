import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";

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
   * Function that performs the validation.
   */
  validate: Function;

  /**
   * Indicates whether validation should continue in the
   * event of an error.  For example is a value is undefined,
   * then there's little point trying to apply the other validators.
   */

  stop: boolean;

  /**
   * The default error message function
   */
  errorMessage: ((vc: ValidationContext, value: any) => string);

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

  constructor(
    object: any,
    target: Function,
    decorator: string,
    propertyName: string,
    validate: Function,
    stop: boolean,
    errorMessage: ((vc: ValidationContext, value: any) => string),
    validationOptions?: ValidationOptions,
    validationParameters?: any[],
    validationTypeOptions?: any
  ) {
    this.object = object;
    this.target = target;
    this.decorator = decorator;
    this.propertyName = propertyName;
    this.validate = validate;
    this.stop = stop;
    this.errorMessage = errorMessage;
    this.validationOptions = validationOptions;
    this.validationParameters = validationParameters;
    this.validationTypeOptions = validationTypeOptions;
  }

  /**
   * The signature for the decorator, class, and class property 
   * combination.
   */
  public getSignature():string {
    return `${this.decorator}_${this.target.name}_${this.propertyName}`;
  }
}