import { getPropertyKey } from "./utilities";
import { ValidationContainer } from "./ValidationContainer";
import { ValidationContext } from "./ValidationContext";
import { IsDefined } from './decorators/IsDefined'

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