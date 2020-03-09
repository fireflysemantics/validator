import { ValidationOptions } from "../src/ValidationOptions";

export const options: ValidationOptions = {
  message: () => {
    return "Wazzzzaaaaaaapppppp????!!!!";
  }
};

/**
 * Message function
 */
export type Message = () => string