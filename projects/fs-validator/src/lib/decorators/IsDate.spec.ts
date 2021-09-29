import { ValidationContainer } from "../ValidationContainer";
import { ValidationContext } from "../ValidationContext";
import { getPropertyKey } from "../utilities";
import { IsDate } from "./IsDate";
const { getOwnPropertyNames } = Object;

class IsDateValid {
  @IsDate() p1: Date = new Date();
}
const IDV: any = new IsDateValid();

describe("IsDate Validation", () => {
  it(`should return true when using 
      the ValidationContext.validate 
      method to check valid values`, () => {
    getOwnPropertyNames(IDV).forEach(pn => {
      const key: string = getPropertyKey(IDV.constructor.name, pn);
      const validators = ValidationContainer.cache.get(key);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).toBeTruthy();
    });
  });

  class IsDateInvalid {
    @IsDate() p0: Date = null;
  }
  const IDI: any = new IsDateInvalid();  

  it(`should return false when using the 
      ValidationContext.validate method 
      to check invalid values`, () => {    
      getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getPropertyKey(IDI.constructor.name, pn);
      const validators = ValidationContainer.cache.get(key);

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, IDI)).toBeFalsy();
    });
  });
});