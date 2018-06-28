import { isDefined, validateProperty, getValidationContextKey } from "@fireflysemantics/utilities/utilities";
import { ValidationContainer, ValidationContainerHelper } from "@fireflysemantics/container/validation/ValidationContainer";
import { expect } from "chai";
import { NoOptionsValid, NoOptionsInvalid } from "@test/decorators/IsDefined";
import "mocha";

const nov = new NoOptionsValid();
const nov_p1 = 'p1';
const nova = new NoOptionsInvalid();
const nova_p0 = 'p0';

/**
 * Unit tests for isDefined.
 */

describe("isDefined", () => {
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

describe("getValidationContextKey", () => {
  it("It should return an initialized context when the property is decorated", () => {
    const p1 = 'p1';
    const key = getValidationContextKey(nov.constructor.name, p1);
    let vcs = ValidationContainerHelper.getValidationContextIndex(key);
    expect(vcs).to.exist;
    expect(ValidationContainer.getValidationContextValues(key).length).to.equal(1);
  });
});

/**
 * Unit tests for validateProperty.
 */
describe("validateProperty", () => {
  it("should return false when validating the p0 property", () => {
    expect(validateProperty(nov, nov_p1)).to.be.true;
    expect(validateProperty(nova, nova_p0)).to.be.false;
  });
});