import { IsDefined } from "@fs/decorators/IsDefined";
import { IsGreaterThan } from "@fs/decorators/IsGreaterThan";
import { ErrorContainer } from "@fs/container/error/ErrorContainer";
import { getValidationContextContainerKey } from "@fs/utilities/utilities";
import { validateProperty, validate } from "@fs/utilities/utilities";
import { expect } from "chai";
import "mocha";

class IsGreaterThanTest1 {
  firstNumber: number = 10; 

  @IsGreaterThan("firstNumber")
  secondNumber: number = 20;
}

const IGTT1 = new IsGreaterThanTest1();

class IsGreaterThanTest2 {
  firstNumber: number = 10; 

  @IsGreaterThan("firstNumber")
  secondNumber: number = 20;
}

const IGTT2 = new IsGreaterThanTest2();

describe("IfGreaterThan Validation", () => {
  it("should work for string property key arguments", () => {
    expect(validateProperty(IGTT1, "secondNumber")).to.be.true;
    expect(validate(IGTT1)).to.be.true;
  });
  it("should work for number property key arguments", () => {
    expect(validateProperty(IGTT2, "secondNumber")).to.be.true;
    expect(validate(IGTT2)).to.be.true;
  });  
});