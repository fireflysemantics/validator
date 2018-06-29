import { isDefined, validateProperty, getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import { ValidationContainerHelper } from "@fireflysemantics/container/validation/ValidationContainer";
import { ErrorContainer } from "@fireflysemantics/container/error/ErrorContainer";
import { IsDefined } from '@fireflysemantics/decorators/IsDefined'
import { expect } from "chai";
import "mocha";
const { getValidationContextIndex } = ValidationContainerHelper;

class UtilitiesInvalid {
  @IsDefined() p0: any = null;
}

export class UtilitiesValid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}

const uiv = new UtilitiesValid();
const uiv_p1 = 'p1';
const ui = new UtilitiesInvalid();
const ui_p0 = 'p0';

/**
 * Unit tests for isDefined.
 */

describe("Utilities isDefined", () => {
  it("should return false for undefined or null arguments", () => {
    expect(isDefined(undefined)).to.be.false;
    expect(isDefined(null)).to.be.false;
  });
  it("should return true for non null or undefined arguments", () => {
    expect(isDefined({})).to.be.true;
    expect(isDefined("foo")).to.be.true;
    expect(isDefined("")).to.be.true;
    expect(isDefined(0)).to.be.true;
    expect(isDefined(-0)).to.be.true;
    expect(isDefined(Infinity)).to.be.true;
    expect(isDefined(-Infinity)).to.be.true;
    expect(isDefined(NaN)).to.be.true;
    expect(isDefined(new Date())).to.be.true;
  });
});

describe("Utilities  getValidationContextKey", () => {
  it("It should return a working ValidationContext key", () => {
    const key = getValidationContextKey(uiv.constructor.name, uiv_p1);
    let vcs = getValidationContextIndex(key);
    expect(vcs).to.exist;
  });
});

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validateProperty", () => {
  it("should return false when validating an invalid property", () => {
    expect(validateProperty(ui, ui_p0)).to.be.false;
    const key = getValidationContextKey(ui.constructor.name, ui_p0);
    expect(ErrorContainer.getValidationErrors(key).length).to.equal(1);
  });
  it("should return true when validating the p0 property", () => {
    expect(validateProperty(uiv, uiv_p1)).to.be.true;
  });
});