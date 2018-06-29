import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import { expect } from "chai";
import { NoOptionsValid, NoOptionsInvalid, NoOptionsValidArray, Options } from "@test/decorators/IsDefined";
import "mocha";
const { getOwnPropertyNames } = Object;
const { getValidationContextValues } = ValidationContainer;

const nov: any = new NoOptionsValid();

describe("IsDefined Validation", () => {
  it("should return true when using the ValidationContext.validate method to check valid values.", () => {
    getOwnPropertyNames(nov).forEach(pn => {
      const key: string = getValidationContextKey(nov.constructor.name, pn);
      const validators = getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(nov.constructor.name);

      expect(vc.validateValue(vc, nov)).to.be.true;
    });
  });

  it("should return false when using the validate method to check invalid values.", () => {
    const invalid:any = new NoOptionsInvalid();
    
    Object.getOwnPropertyNames(invalid).forEach(pn => {
      const key: string = getValidationContextKey(invalid.constructor.name, pn);
      const validators = getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, invalid)).to.be.false;
    });
  });
});
