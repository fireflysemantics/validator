import { ValidationContext } from "@fs/container/validation";
import { getPropertyKey } from "@fs/utilities/utilities";
import { isDefined } from "@fireflysemantics/is";
import { MetaClass } from "@fs/container/validation";
import { ValidationContextContainer } from "@fs/container/validation";

/**
 * The `ValidationContainer` holds all validation contexts
 * created by the validation decorators.
 */
export class ValidationContainer {

  /**
   * The index for all of the ValidationContext instances.
   * Not meant to be accessed directly.  Only decorators should
   * be modifying the state of the cache by using the @see addValidationContext method.
   * 
   * The `key` of the cache consists of the class name and prperty name.
   */
  static cache:Map<string, ValidationContextContainer> = new Map();

  /**
   * Meta classes which have a one to one
   * correspondence with each decorated class.
   */
  static metaClasses: Map<string, MetaClass> = new Map();

  /**
   * Adds the MetaClass instance corresponding to 
   * the <code>target</code> parameter if it does 
   * not already exist.  
   * 
   * Also adds the <code>propertyName</code> 
   * parameter to the MetaClass instance if that does not exist.
   * 
   * @param target 
   * @param propertyName 
   */
  public static addMetaClassAndPropertyIfAbsent(target: any, propertyName: string) {    

    //The constructor name of the decorated class
    const constructorName = target.constructor.name;

    if (!isDefined(this.metaClasses.get(constructorName))) {
      this.metaClasses.set(constructorName, new MetaClass(target));
      this.metaClasses.get(constructorName).addProperty(propertyName);
    }
    else {
      this.metaClasses.get(constructorName).addProperty(propertyName);
    }
  }

  /**
   * @param vc Add a ValidationContext instance.
   */
  public static addValidationContext(vc: ValidationContext): void {
    const key: string = getPropertyKey(
      vc.target.name,
      vc.propertyName
    );
    
    const vcc:ValidationContextContainer = this.cache.get(key);

    if (vcc) {
      vcc.add(vc);
    }
    else {
      const vcc:ValidationContextContainer = new ValidationContextContainer(key);
      vcc.add(vc);
      this.cache.set(key, vcc);
    }
  }
}