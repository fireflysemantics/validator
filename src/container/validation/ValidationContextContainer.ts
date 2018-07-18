import { ValidationContext } from "@fs/container/validation/ValidationContext";

/**
 * Class that holds validation container instances representing the ValidationContainer cache.
 *
 * Use the objectPropertyKey to get the IValidationContextIndex
 * and then the validationContextKey to get a ValidationContext instance.
 */
export class ValidationContextContainer {
  /**
   * The objectAndPropertyName key used to lookup this instance.
   */
  public key: string;
  /**
   * The validation context array.
   */
  public vcs: ValidationContext[] = [];

  constructor(key: string) {
    this.key = key;
  }

  /**
   * Adds the ValidationContext instance.
   *
   * @param target The ValidationContext instance we are adding
   * @throws Error if attempting to add a ValidationContext with a signature that duplicates that of an instance already contained.
   *
   * If an exception thrown it indicates that a duplicate class definition exist
   * in the runtime.  In other words the same class definition is loaded more
   * than once because it exists in multiple files.
   */
  public add(target: ValidationContext): void {
    const added: boolean = this.vcs.every(vc => {
      return vc.getSignature() != target.getSignature();
    });
    if (!added) {
      const errorString = `The ValidationContextContainer 
      already contains context with signature ${target.getSignature()}.`;
      throw new Error(errorString);
    }
    this.vcs.push(target);
  }
}
