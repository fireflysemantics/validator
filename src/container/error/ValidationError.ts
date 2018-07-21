import { ValidationContext } from "../validation/ValidationContext";

/**
 * Validation error description.
 */
export class ValidationError {

  /**
   * The object containing the invalid property.
   */
  object: any;

  /**
   * The name of the property containing the value that
   * did not pass the validation check.
   */
  propertyName: string;

  /**
   * The value that failed the validation check.
   */
  value: any;

  /**
   * If {@link ValidationError.isValueArray} is true,
   * this property stores the indexes of the values that 
   * failed validation.  
   */
  errorIndex?: Number[];

  /**
   * Whether the value is an array.
   */
  isValueArray: boolean;

  /** 
   * The validation context 
   */
  vc: ValidationContext;

  constructor(vc: ValidationContext, object: any,  propertyName:string, value: any, errorIndex?: Number[]) {
    this.vc = vc;
    this.propertyName = propertyName;
    this.object = object;
    this.value = value;
    this.errorIndex = errorIndex;
  }  
}
