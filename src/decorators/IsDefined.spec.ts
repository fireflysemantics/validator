import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import { IsDefined } from "@fireflysemantics/decorators/IsDefined";
import { expect } from "chai";
import "mocha";
const { getOwnPropertyNames } = Object;
const { getValidationContextValues } = ValidationContainer;

export class IsDefinedInvalid {
  @IsDefined() p0: any = null;
}

export class IsDefinedValid {
  @IsDefined() p0: any = "";
}

const idi: any = new IsDefinedInvalid();
const idv: any = new IsDefinedValid();

describe("IsDefined Validation", () => {
  it("should return true when using the ValidationContext.validate method to check valid values", () => {
    getOwnPropertyNames(idi).forEach(pn => {
      const key: string = getValidationContextKey(idv.constructor.name, pn);
      const validators = getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(idv.constructor.name);

      expect(vc.validateValue(vc, idv)).to.be.true;
    });
  });

  it("should return false when using the ValidationContext.validate method to check invalid values", () => {    
    Object.getOwnPropertyNames(idi).forEach(pn => {
      const key: string = getValidationContextKey(idi.constructor.name, pn);
      const validators = getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, idi)).to.be.false;
    });
  });
});