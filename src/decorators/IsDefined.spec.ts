import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContext } from "../container/validation/ValidationContext";
import { getObjectPropertyKey, validate } from "../utilities/utilities";
import { IsDefined } from "./IsDefined";
const { getOwnPropertyNames } = Object;

class IsDefinedValid {
  @IsDefined() p0: any = "";
}

class IsDefinedInvalid {
  @IsDefined() p0: any = null;
}

const IDV: any = new IsDefinedValid();
const IDI: any = new IsDefinedInvalid();

describe("IsDefined Validation", () => {
  it(`should return true when using the 
      ValidationContext.validate method 
      to check valid values`, () => {
    getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getObjectPropertyKey(IDV, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).toBeTruthy();
    });
  });
    
  it(`should return false when using the 
      ValidationContext.validate method to check invalid values`, () => {    
    Object.getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getObjectPropertyKey(IDI, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, IDI)).toBeFalsy();
    });
  });
});

it(`should create an error when using validate`, ()=>{
  let IDI = new IsDefinedInvalid();
  let e = validate(IDI);
  expect(e.valid).toBeFalsy();
});