import { IsDefined } from "@fireflysemantics/decorators/IsDefined";
import { IfValid } from "@fireflysemantics/decorators/IfValid";
import { ErrorContainer } from "@fireflysemantics/container/error/ErrorContainer";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import { validateProperty } from "@fireflysemantics/utilities/utilities";
import { expect } from "chai";
import "mocha";

class IfValidTest {
  @IsDefined() 
  p0: any = null;
  @IsDefined() 
  @IfValid("p0")
  p1: any = "Should not validate";
}

const ivt = new IfValidTest();

describe("IfValid Validation", () => {
  it("should not validate p1 since p0 is invalid", () => {
    expect(validateProperty(ivt, "p1")).to.be.false;
    const key = getValidationContextKey(ivt.constructor.name, "p1");
    expect(ErrorContainer.getValidationErrors(key).length).to.equal(1);
    //console.dir(ErrorContainer.getValidationErrors(key));
  });
});