import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";

/**
 * Interface representing the ValidationContainer cache.
 */
export interface IValidationContextsIndex {
    [objectPropertyKey: string]: IValidationContextIndex;
}

export interface IValidationContextIndex {
    [validationContextKey: string]: ValidationContext;
}

