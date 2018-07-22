import { IfValid } from "./IfValid";
import { ErrorContainer } from "../container/error/ErrorContainer";
import { getValidationContextContainerKey } from "../utilities/utilities";
import { validateProperty, validate } from "../utilities/utilities";

import { expect } from "chai";
import "mocha";
import { IsDate } from "./IsDate";
import { IsAfterInstant } from "./IsAfterInstant";


class IsAfterInstant1 {
  @IsDate() 
  p0: Date = new Date(0);

  @IsAfterInstant("p0") 
  @IfValid("p0")
  p1: Date = new Date(1);
}

const IAI1 = new IsAfterInstant1();

class IsAfterInstant2 {
  @IsDate() 
  p0: Date = new Date(1);

  @IsAfterInstant("p0") 
  @IfValid("p0")
  p1: Date = new Date(0);
}

const IAI2 = new IsAfterInstant2();

class IsAfterInstant3 {
  @IsAfterInstant(new Date(0)) 
  p0: Date = new Date(1);
}

const IAI3 = new IsAfterInstant3();


describe("IsAfterInstant Validation", () => {
  it("should work like this", () => {
    ErrorContainer.clear();

    let key_p0 = getValidationContextContainerKey(IAI1, "p0");
    let key_p1 = getValidationContextContainerKey(IAI1, "p1");

    expect(validateProperty(IAI1, "p1")).to.be.true;
    expect(ErrorContainer.getValidationErrors(key_p0)).to.be.undefined;
    expect(ErrorContainer.getValidationErrors(key_p1)).to.be.undefined;

    expect(validate(IAI1)).to.be.true;
    expect(ErrorContainer.getValidationErrors(key_p0)).to.be.undefined;
    expect(ErrorContainer.getValidationErrors(key_p1)).to.be.undefined;
    expect(ErrorContainer.getErrorContainerValues().length).to.equal(0);

    key_p0 = getValidationContextContainerKey(IAI2, "p0");
    key_p1 = getValidationContextContainerKey(IAI2, "p1");

    expect(validate(IAI2)).to.be.false;
    expect(ErrorContainer.getValidationErrors(key_p0)).to.be.undefined;
    expect(ErrorContainer.getValidationErrors(key_p1)).to.exist;
    expect(ErrorContainer.getErrorContainerValues().length).to.equal(1);

    expect(validate(IAI3)).to.be.true;
  });
});