import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextContainerKey } from "@fireflysemantics/utilities/utilities";
import { IValidationContextsIndex } from "@fireflysemantics/container/validation/IValidationContextIndex";
import { IMetaClassIndex } from "@fireflysemantics/container/validation/IMetaClassIndex";
import { isDefined } from "@fireflysemantics/is";
import { MetaClass } from "@fireflysemantics/container/validation/MetaClass";
import { ValidationContextContainer } from "@fireflysemantics/container/validation/ValidationContextContainer";

/**
 * Validation container holding all validation contexts
 * created by the validation decorators.
 */
export class ValidationContainer {

  /**
   * The index for all of the ValidationContext instances.
   * Not meant to be accessed directly.  Only decorators should
   * be modifying the state of the cache by using the @see addValidationContext method.
   */
  static cache: IValidationContextsIndex = {};
  static metaClasses: IMetaClassIndex = {};

  /**
   * Adds the MetaClass instance corresponding to 
   * the <code>target</code> parameter if it does 
   * not already exist.  Also adds the <code>propertyName</code> 
   * parameter to the MetaClass instance if that does not exist.
   * 
   * @param target 
   * @param propertyName 
   * 
   */
  public static addMetaClassAndPropertyIfAbsent(target: any, propertyName: string) {    

    const constructorName = target.constructor.name;

    if (!isDefined(this.metaClasses[constructorName])) {
      this.metaClasses[constructorName] = new MetaClass(target);
      this.metaClasses[constructorName].addProperty(propertyName);
    }
    else {
      this.metaClasses[constructorName].addProperty(propertyName);
    }
  }

  /**
   * @param vc Add a ValidationContext instance.
   */
  public static addValidationContext(vc: ValidationContext): void {
    const key: string = getValidationContextContainerKey(
      vc.target.name,
      vc.propertyName
    );
    
    const vcc:ValidationContextContainer = this.cache[key];

    if (vcc) {
      vcc.add(vc);
    }
    else {
      const vcc:ValidationContextContainer = new ValidationContextContainer(key);
      vcc.add(vc);
      this.cache[key] = vcc;
    }
  }
}