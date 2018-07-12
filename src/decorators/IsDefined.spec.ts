import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextContainerKey } from "@fireflysemantics/utilities/utilities";
import { IsDefined } from "@fireflysemantics/decorators/IsDefined";
import { expect } from "chai";
import "mocha";
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
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).to.be.true;
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
      expect(vc.validateValue(vc, IDI)).to.be.false;
    });
  });
});