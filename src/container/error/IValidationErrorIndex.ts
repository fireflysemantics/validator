import { ValidationError} from '@fs/container/error/ValidationError';

/**
 * Interface representing the ValidationContainer cache.
 */
export interface IValidationErrorIndex {
    [errorKey: string]: Array<ValidationError>;
}
  