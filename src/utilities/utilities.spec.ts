import { validate, validateProperty, getPropertyKey } from "./utilities";
import { ValidationContainer } from "@fs/container/validation/ValidationContainer";
import { ValidationContext } from "@fs/container/validation/ValidationContext";
import { IsDefined } from '@fs/decorators/IsDefined'
import { ObjectErrors } from '@fs/container/error'

export class Valid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}

const V = new Valid();
const v_p1 = 'p1';

describe("Utilities getValidationContextKey", () => {
  it(`should return a working ValidationContext key`, () => {
    const key1 = getPropertyKey(V.constructor.name, v_p1);
    const key2 = getPropertyKey(V, v_p1);
    expect(key1).toEqual(key2);
    let vca:Array<ValidationContext> = ValidationContainer.cache.get(key1);
    expect(vca).not.toBeNull();
  });
});

class Invalid {
  @IsDefined() p0: any = null;
}

const I = new Invalid();
const i_p0 = 'p0';

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validateProperty", () => {
  it("should return false when validating an invalid property", () => {
    let oes = new ObjectErrors();
    expect(validateProperty(I, i_p0, oes)).toBeFalsy();
    const key = getPropertyKey(I, i_p0);
    expect(oes.getErrors(key).length).toBeGreaterThan(0);
  });
});

/**
 * Unit tests for validateProperty.
 */
describe("Utilities validate", () => {
  it("should return false when validating an invalid object", () => {
    let oes = validate(I);
    expect(validate(I).valid).toBeFalsy();
    const key = getPropertyKey(I, i_p0);
    expect(oes.getErrors(key).length).toBeGreaterThan(0);
    expect(oes.errors[0].errorMessage).toContain('p0');
  });
});