import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { isDefined } from "@fireflysemantics/utilities/utilities";

/**
 * Validation error description.
 */
export class ValidationError {
  /**
   * The object containing the invalid property.
   */
  object: any;
  /**
   * The value that failed the validation check.
   */
  value: any;

  /**
   * Indexes of values that failed the check.
   */
  indexes?:Array<Number>;

  /** The validation context */
  vc: ValidationContext;

  constructor(object: any, vc: ValidationContext, value: any) {
    this.object = object;
    this.value = value;
    this.vc = vc;
  }
  
  private pushIndexIfAbsent(index:Number):void {
    if (!isDefined(this.indexes)) {
      this.indexes = new Array<Number>();
      this.indexes.push(index);
    }
    else {
      this.indexes.push(index);
    }
  }

  /**
   * Update the indexes array with the index of the invalid value.
   * @param index 
   */
  public addErrorIndex(index:Number):void {
    this.pushIndexIfAbsent(index);
  }
}
