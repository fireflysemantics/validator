import { ValidationError} from './ValidationError';

/**
 * Interface representing the ValidationContainer cache.
 */
export interface IValidationErrorIndex {
    [errorKey: string]: Array<ValidationError>;
}
  