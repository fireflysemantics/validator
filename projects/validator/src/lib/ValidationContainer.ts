import { ValidationContext } from "./ValidationContext"
import { getPropertyKey } from "./utilities"
import { isDefined } from "@fireflysemantics/is"
import { MetaClass } from "./MetaClass"

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
  static cache:Map<string, ValidationContext[]> = new Map();

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
   * @param target Add a ValidationContext instance.
   * @throws Error if attempting to add a ValidationContext with a signature that duplicates that of an instance already contained.
   * 
   * If an exception thrown it indicates that a duplicate class definition exist
   * in the runtime.  In other words the same class definition is loaded more
   * than once because it exists in multiple files.
   * 
   */
  public static addValidationContext(target: ValidationContext): void {

    const key: string = getPropertyKey(
      target.target.name,
      target.propertyName
    );

    console.log("The property key is: ", key)
    console.log("The target signature is: ", target.getSignature())

    const vca:ValidationContext[] = this.cache.get(key);

    let notAdded = true;

    if (vca) {
      notAdded = vca.every(vc => {
        //Every will return the first false.
        return vc.getSignature() != target.getSignature();
      });  
    }
    if (!notAdded) {
      const errorString = `The ValidationContainer 
      already contains context with signature ${target.getSignature()}.`;
      throw new Error(errorString);
    }
    if (vca) {
      vca.push(target);
    }
    else {
      const vca:ValidationContext[] = [];
      vca.push(target);
      this.cache.set(key, vca);
    }
  }
}