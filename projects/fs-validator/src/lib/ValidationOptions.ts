import { ValidationContext } from './ValidationContext'

/**
 * Interface for the options passed to validation decorators.
 */
export interface ValidationOptions {
    //=====================================
    // Error message created on validation fail.
    //=====================================
    message?: (vc: ValidationContext, value: string) => string;

    //=====================================
    // For @IsDefined we want to allow
    // users to skip error generation in the 
    // event that the validation should not 
    // proceed when the property is not defined.
    //=====================================
    skipErrorGeneration?:boolean 
}