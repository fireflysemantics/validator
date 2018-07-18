import { IsDefined } from "@fs/decorators/IsDefined";
import { IfValid } from "@fs/decorators/IfValid";
import { ErrorContainer } from "@fs/container/error/ErrorContainer";
import { getValidationContextContainerKey } from "@fs/utilities/utilities";
import { validateProperty } from "@fs/utilities/utilities";
import { expect } from "chai";
import "mocha";

class IfValidNotTest {
  @IsDefined() 
  p0: any = null; //Property not valid

  @IfValid("p0")
  @IsDefined() 
  p1: any = "Should not validate";
}

const IVT = new IfValidNotTest();

describe("IfValid Validation", () => {
  it("should not validate p1 since p0 is invalid", () => {
    expect(validateProperty(IVT, "p1")).to.be.false;
    const key = getValidationContextContainerKey(IVT, "p1");
    expect(ErrorContainer.getValidationErrors(key).length).to.equal(1);
//    console.dir(ErrorContainer.getValidationErrors(key));
  });
});