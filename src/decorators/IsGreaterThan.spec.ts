import { ValidationContext } from "../container/validation/ValidationContext";
import { IsGreaterThan } from "./IsGreaterThan";
import { ErrorContainer } from "../container/error/ErrorContainer";
import { getValidationContextContainerKey } from "../utilities/utilities";
import { validateProperty, validate } from "../utilities/utilities";

import { expect } from "chai";
import "mocha";

class IsGreaterThanTest0 {
  @IsGreaterThan(30)
  secondNumber: number = 20;
}

const IGTT0 = new IsGreaterThanTest0();

class IsGreaterThanTest1 {
  firstNumber: number = 10; 

  @IsGreaterThan("firstNumber")
  secondNumber: number = 20;
}

const IGTT1 = new IsGreaterThanTest1();

class IsGreaterThanTest2 {
  firstNumber: number = 10; 

  @IsGreaterThan(10)
  secondNumber: number = 20;
}

const IGTT2 = new IsGreaterThanTest2();

class IsGreaterThanTest3 {
  firstNumber: number = 20; 

  @IsGreaterThan("firstNumber")
  secondNumber: number = 10;
}

const IGTT3 = new IsGreaterThanTest3();

class IsGreaterThanTest4 {
  firstNumber: number = 10; 

  @IsGreaterThan("firstNumber")
  secondNumber: number = 10;
}

const IGTT4 = new IsGreaterThanTest4();

describe("IfGreaterThan Validation", () => {
  it("should work like this", () => {
    expect(validate(IGTT0)).to.be.false;
    const key:string = getValidationContextContainerKey(IGTT0, "secondNumber");
    const vc:ValidationContext = ErrorContainer.getValidationErrors(key)[0].vc;

  });  

  it("should work for string property key arguments", () => {
    expect(validateProperty(IGTT1, "secondNumber")).to.be.true;
    expect(validate(IGTT1)).to.be.true;
    expect(validateProperty(IGTT3, "secondNumber")).to.be.false;
    expect(validate(IGTT3)).to.be.false;
    expect(validateProperty(IGTT4, "secondNumber")).to.be.false;
    expect(validate(IGTT4)).to.be.false;
  });
  it("should work for number property key arguments", () => {
    expect(validateProperty(IGTT2, "secondNumber")).to.be.true;
    expect(validate(IGTT2)).to.be.true;
  });  
});