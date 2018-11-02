import { ValidationContext } from "../validation/ValidationContext";

/**
 * There can be multiple `ValidationError` instances per 
 * object property, since each `ValidationError` is created 
 * when property value fails the decorators validation test
 * contained on the corresponding `ValidationContext`.
 * 
 * Instances of `ValidationError` contain the:
 * - The `object` and `objectProperty` that was validated 
 * - {@link ValidationContext} used to perform the validation
 * - The `value` being validated
 * - An `errorIndex` (When the value being validated is an array)
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
   * 
   * If this is an array of values, then the 
   * {@link ValidationError.errorIndex} stores
   * the indices of the values that did not pass validation.
   * 
   * Check if the value is an array using `value instanceof Array`.
   */
  value: any;

  /**
   * Stores the indexes of the values that 
   * failed validation when the value property is an array.  
   * 
   * Use [@fireflysemantics/is/isArray](https://fireflysemantics.github.io/is/doc/modules/_is_.html#isarray)
   * to check whether {@link ValidationError.value} is an array.
   */
  errorIndex?: Number[];

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

  /**
   * Get the validation error message.
   */
  get errorMessage():string {
    return this.vc.errorMessage(this.vc, this.object);
  }
}