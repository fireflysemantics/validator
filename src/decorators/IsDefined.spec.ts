import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContext } from "../container/validation/ValidationContext";
import { getValidationContextContainerKey } from "../utilities/utilities";
import { IsDefined } from "./IsDefined";
const { getOwnPropertyNames } = Object;

class IsDefinedValid {
  @IsDefined() p0: any = "";
}

const IDV: any = new IsDefinedValid();

describe("IsDefined Validation", () => {
  it(`should return true when using the 
      ValidationContext.validate method 
      to check valid values`, () => {
    getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getValidationContextContainerKey(IDV, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).toBeTruthy();
    });
  });

  class IsDefinedInvalid {
    @IsDefined() p0: any = null;
  }
  
  const IDI: any = new IsDefinedInvalid();
    
  it(`should return false when using the 
      ValidationContext.validate method to check invalid values`, () => {    
    Object.getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getValidationContextContainerKey(IDI, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, IDI)).toBeFalsy();
    });
  });
});