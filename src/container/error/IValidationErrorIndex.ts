import { ValidationError} from '@fireflysemantics/container/error/ValidationError';

/**
 * Interface representing the ValidationContainer cache.
 */
export interface IValidationErrorIndex {
    [errorKey: string]: Array<ValidationError>;
}
  