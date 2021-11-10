import { ValidationOptions } from "../ValidationOptions";
import { ValidationContext } from "../ValidationContext";
import { ValidationContainer } from "../ValidationContainer";
import { isMongoId } from "@fireflysemantics/validatorts";
import { errorMessage } from "..";

/**
 * Decorator that checks if the property is a MongoID.  
 * 
 * ### Example
 *``` 
 * class IsMongoIDDemo {
 *     @IsMongoID('en-US') 
 *     @IsMongoID() 
 *     id:string = '507f1f77bcf86cd799439011'
 * }
 * ```
 * 
 * @param validationOptions The validation options
 */
export function IsMongoID(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    
    function messageFunction(vc: ValidationContext) {
      return "should be a MongoID"
    }

    const vc: ValidationContext = new ValidationContext(
      object,
      object.constructor,
      IsMongoID.name,
      propertyName,
      validateValue,
      validateArray,
      true,
      errorMessage(messageFunction),
      validationOptions
    );
    ValidationContainer.addMetaClassAndPropertyIfAbsent(object, propertyName);
    ValidationContainer.addValidationContext(vc);
  };
}

/**
 * Value is valid if it passes the {@link isMongoId} check.
 * 
 * @param vc The validation context.
 * @param o The object containing the property to validate.
 * @return The result of the call to {@link isMongoId}
 */
export function validateValue(vc:ValidationContext, o:any):boolean {
  return !!isMongoId(o[vc.propertyName]).value;
}

/**
 * 
 * @param vc  The validation context.
 * @param values The array of values. 
 * @return An empty array if valid, an array of indexes otherwise.
 */
export function validateArray(vc:ValidationContext, values:any[]):Array<Number> {
  const errorIndex:Array<Number> = [];
  values.forEach((v, i)=>{
    if (!isMongoId(v).value) {
      errorIndex.push(i);
    }
  });
  return errorIndex;
}