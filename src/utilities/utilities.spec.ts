import { validate, validateProperty, getValidationContextContainerKey } from "./utilities";
import { ErrorContainer } from "../container/error/ErrorContainer";
import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContext } from "../container/validation/ValidationContext";
import { IsDefined } from '../decorators/IsDefined'
import { expect } from "chai";
import "mocha";

export class UtilitiesValid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}

const UIV = new UtilitiesValid();
const uiv_p1 = 'p1';

describe("Utilities  getValidationContextKey", () => {
  it(`should return a working ValidationContext key`, () => {
    const key1 = getValidationContextContainerKey(UIV.constructor.name, uiv_p1);
    const key2 = getValidationContextContainerKey(UIV, uiv_p1);
    expect(key1).to.equal(key2);
    let vcs:Array<ValidationContext> = ValidationContainer.cache[key1].vcs;
    expect(vcs).to.exist;
  });
});

class UtilitiesInvalid {
  @IsDefined() p0: any = null;
}

const UI = new UtilitiesInvalid();
const ui_p0 = 'p0';

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validateProperty", () => {
  it("should return false when validating an invalid property", () => {
    expect(validateProperty(UI, ui_p0)).to.be.false;
    const key = getValidationContextContainerKey(UI, ui_p0);
    expect(ErrorContainer.getValidationErrors(key).length).to.be.greaterThan(0);
  });
});

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validate", () => {
  it("should return false when validating an invalid object", () => {
    expect(validate(UI)).to.be.false;
    const key = getValidationContextContainerKey(UI, ui_p0);
    expect(ErrorContainer.getValidationErrors(key).length).to.be.greaterThan(0);
  });
});