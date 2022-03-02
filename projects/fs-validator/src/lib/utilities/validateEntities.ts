import { ObjectErrors, ValidationError, EntityError } from "..";

export function validationErrorToEntityError(
    ve: ValidationError,
    idProperty: string
  ): EntityError {
    const ER: EntityError = {
      id: ve.object[idProperty],
      property: ve.propertyName,
      value: ve.value,
      message: ve.message,
      type: ve.vc.target.name,
    };
    return ER;
  }
  
  export function validateEntities(
    OES: ObjectErrors[],
    idProperty: string
  ): EntityError[] {
    let entityErrors:EntityError[] = [];
    OES.forEach((oe) => {
      const ves: ValidationError[] = oe.errors;
      const EES: EntityError[] = ves.map((ve) =>
        validationErrorToEntityError(ve, idProperty)
      );
      entityErrors = [...entityErrors, ...EES];
    });
    return entityErrors;
  }
  