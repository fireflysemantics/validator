import { validate, validateProperty, getPropertyKey } from "./utilities";
import { ValidationContainer } from "../container/validation/ValidationContainer";
import { ValidationContext } from "../container/validation/ValidationContext";
import { IsDefined } from '../decorators/IsDefined'
import { ObjectErrors } from '../container/error'

export class UtilitiesValid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}

const UIV = new UtilitiesValid();
const uiv_p1 = 'p1';

describe("Utilities  getValidationContextKey", () => {
  it(`should return a working ValidationContext key`, () => {
    const key1 = getPropertyKey(UIV.constructor.name, uiv_p1);
    const key2 = getPropertyKey(UIV, uiv_p1);
    expect(key1).toEqual(key2);
    let vcs:Array<ValidationContext> = ValidationContainer.cache[key1].vcs;
    expect(vcs).not.toBeNull();
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
    let oes = new ObjectErrors();
    expect(validateProperty(UI, ui_p0, oes)).toBeFalsy();
    const key = getPropertyKey(UI, ui_p0);
    expect(oes.getErrors(key).length).toBeGreaterThan(0);
  });
});

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validate", () => {
  it("should return false when validating an invalid object", () => {
    let oes = validate(UI);
    expect(validate(UI).valid).toBeFalsy();
    const key = getPropertyKey(UI, ui_p0);
    expect(oes.getErrors(key).length).toBeGreaterThan(0);
    expect(oes.errors[0].errorMessage).toContain('p0');
  });
});