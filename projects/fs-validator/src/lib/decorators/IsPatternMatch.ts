import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isMatch, isDefined } from "@fireflysemantics/validatorts"; 
import { errorMessage } from "..";

/**
 * Decorator that checks if the value matches
 * the pattern.  
 * 
 * ### Example
 *``` 
 * class IsPatternMatchDemo {
 *     @IsPatternMatch(/xyz/) alpha:string = 'xyz'
 * }
 * ```
 * 
 * @param pattern The match pattern
 * @param modifiers The modifiers
 * @param validationOptions The validation options
 */
export function IsPatternMatch(pattern: RegExp, modifiers?: number, validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    const validationParameters:any[] = [];
    validationParameters.push(pattern);
    if (isDefined(modifiers)) {
      validationParameters.push(modifiers);
    }
    else {
      validationParameters.push(Infinity);
    }

    function messageFunction(vc: ValidationContext) {
      return `should match the pattern [${vc.validationParameters[0]}`
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsPatternMatch.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions,
      validationParameters
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
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
  return !!isMatch(o[vc.propertyName], pattern, modifiers).value;
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
    if (!isMatch(v, pattern, modifiers).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}