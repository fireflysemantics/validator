import { ValidationContextContainer } from "./ValidationContextContainer";

/**
 * Interface representing the ValidationContainer cache.
 * 
 * Use the objectPropertyKey to get the IValidationContextIndex
 * and then the validationContextKey to get a ValidationContext instance.
 */
export interface IValidationContextsIndex {
    [objectPropertyKey: string]: ValidationContextContainer;
}