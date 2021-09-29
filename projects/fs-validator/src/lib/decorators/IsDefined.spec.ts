import { ValidationContainer } from "../ValidationContainer";
import { ValidationContext } from "../ValidationContext";
import { validate } from "../validate";
import { getPropertyKey } from "../utilities";
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
      const key: string = getPropertyKey(IDV, pn);
      const validators = ValidationContainer.cache.get(key)!;

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).toBeTruthy();
    });
  });

  it(`should return false when using the 
      ValidationContext.validate method to check invalid values`, () => {
    Object.getOwnPropertyNames(IDI).forEach(pn => {
      const key: string = getPropertyKey(IDI, pn);
      const validators = ValidationContainer.cache.get(key)!;

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, IDI)).toBeFalsy();
    });
  });
});

it(`should create an error when using validate`, () => {
  let IDI = new IsDefinedInvalid();
  let e = validate(IDI);
  expect(e.valid).toBeFalsy();
  expect(e.errors.length).toEqual(1)
});

class IsDefinedInvalidSkipErrorMessage {
  @IsDefined({ skipErrorGeneration: true }) p0: any = null;
}

test("It should skip error generation when declared in options", ()=>{
  let IDI = new IsDefinedInvalidSkipErrorMessage();
  let e = validate(IDI);
  expect(e.errors.length).toEqual(0)
})