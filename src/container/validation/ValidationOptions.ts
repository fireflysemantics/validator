import { ValidationContext } from '@fs/container/validation/ValidationContext'
/**
 * Options used to pass to validation decorators.
 */
export interface ValidationOptions {
    /**
     * Error message created on validation fail.
     */
    message?: ((vc: ValidationContext, value: string) => string);
}