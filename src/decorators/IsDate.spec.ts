import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextContainerKey } from "@fireflysemantics/utilities/utilities";
import { IsDate } from "@fireflysemantics/decorators/IsDate";
import { expect } from "chai";
import "mocha";
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
      const key: string = getValidationContextContainerKey(IDV.constructor.name, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(IDV.constructor.name);

      expect(vc.validateValue(vc, IDV)).to.be.true;
    });
  });

  class IsDateInvalid {
    @IsDate() p0: Date = null;
  }
  const INI: any = new IsDateInvalid();  

  it(`should return false when using the 
      ValidationContext.validate method 
      to check invalid values`, () => {    
    Object.getOwnPropertyNames(INI).forEach(pn => {
      const key: string = getValidationContextContainerKey(INI.constructor.name, pn);
      const validators = ValidationContainer.cache[key].vcs;

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, INI)).to.be.false;
    });
  });
});