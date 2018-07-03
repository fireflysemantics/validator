import { PREFIX_EACH, PREFIX_SINGLE } from "@fireflysemantics/constants";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { matches, isDefined } from "@fireflysemantics/is"; 

/**
 * Decorator that checks if the value matches
 * the pattern.  
 * 
 * See {@link matches} for a description of the method
 * performing the validation.
 * 
 * @param pattern The match pattern
 * @param modifiers The modifiers
 * @param validationOptions The validation options
 */
export function IsPatternMatch(pattern: number, modifiers?: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(pattern);
    if (isDefined(modifiers)) {
      validationParameters.push(modifiers);
    }
    else {
      validationParameters.push(Infinity);
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsPatternMatch.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage,
      validationOptions,
      validationParameters
    );
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link matches} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link matches}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  const pattern:any = vc.validationParameters[0];
  let modifiers:any = null;
  if (vc.validationParameters[1] !== undefined) {
    modifiers = vc.validationParameters[1];
  }
  return matches(o[vc.propertyName], pattern, modifiers);
}

/**
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<number> {
  const pattern:any = vc.validationParameters[0];
  let modifiers:any = null;
  if (vc.validationParameters[1] !== undefined) {
    modifiers = vc.validationParameters[1];
  }
  const errorIndex:Array<number> = [];
  values.forEach((v, i)=>{
    if (!matches(v, pattern, modifiers)) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}

/**
 * The generated error message string indicating 
 * that the value is not valid according to {@link matches}.
 * 
 * @param vc The validation context
 * @param o The object being validated
 * @return The error message. 
 */
export function errorMessage(vc: ValidationContext, o: any):string {

  const messageLiteral: string = `should match the pattern [${vc.validationParameters[0]}`;

  if (o[vc.propertyName] instanceof Array) {
    return `${PREFIX_EACH} ${vc.propertyName} ${messageLiteral}`;
  }
  return `${PREFIX_SINGLE} ${vc.propertyName} ${messageLiteral}`;
}
