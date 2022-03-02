/**
 * Interface for Entity error reporting.
 */
export interface EntityError {
    id: string;
    property: string;
    value: string;
    type: string;
    message: string;
  }
  