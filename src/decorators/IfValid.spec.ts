import { IsDefined } from "@fs/decorators/IsDefined";
import { IfValid } from "@fs/decorators/IfValid";
import { ErrorContainer } from "@fs/container/error/ErrorContainer";
import { getValidationContextContainerKey } from "@fs/utilities/utilities";
import { validateProperty } from "@fs/utilities/utilities";
import { expect } from "chai";
import "mocha";
import { ErrorContainerHelper } from "dist/container/error/ErrorContainer";

class IfValidNotTest1 {
  @IsDefined() 
  p0: any = null; //Property not valid

  @IsDefined() 
  @IfValid("p0")
  p1: any = null;
}

const IVT1 = new IfValidNotTest1();

class IfValidNotTest2 {
  @IsDefined() 
  p0: any = 'valid'; //Property not valid

  @IsDefined() 
  @IfValid("p0")
  p1: any = null;
}

const IVT2 = new IfValidNotTest2();

describe("IfValid Validation", () => {
  it("should validate p1 since p0 is invalid", () => {

    const key_p0 = getValidationContextContainerKey(IVT1, "p0");
    const key_p1 = getValidationContextContainerKey(IVT1, "p1");
    expect(validateProperty(IVT1, "p1")).to.be.false;
    expect(ErrorContainer.getValidationErrors(key_p0)).to.be.undefined;
    expect(ErrorContainer.getValidationErrors(key_p1)).to.be.undefined;

    expect(validateProperty(IVT1, "p0")).to.be.false;
    expect(ErrorContainer.getValidationErrors(key_p0).length).to.equal(1);
    expect(ErrorContainer.getErrorContainerValues().length).to.equal(1);
  });

  it("should validate p1 since p0 is valid", () => {
    ErrorContainer.clear();
    const key_p0 = getValidationContextContainerKey(IVT2, "p0");
    const key_p1 = getValidationContextContainerKey(IVT2, "p1");

    expect(validateProperty(IVT2, "p0")).to.be.true;
    expect(validateProperty(IVT2, "p1")).to.be.false;
    expect(ErrorContainer.getValidationErrors(key_p0)).to.be.undefined;
    expect(ErrorContainer.getValidationErrors(key_p1)).to.exist;
  });
});