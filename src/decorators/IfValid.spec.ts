import { IsDefined } from "./IsDefined";
import { IfValid } from "./IfValid";
import { ObjectErrors } from "../container/error/ObjectErrors";
import { getObjectPropertyKey } from "../utilities/utilities";
import { validateProperty } from "../utilities/utilities";

class IfValidNotTest1 {
  @IsDefined() 
  p0: any = null; //Property not valid

  @IsDefined() 
  @IfValid("p0")
  p1: any = null;
}

const IVT1 = new IfValidNotTest1();

class IfValidNotTest2 {
  @IsDefined() 
  p0: any = 'valid'; //Property not valid

  @IsDefined() 
  @IfValid("p0")
  p1: any = null;
}

const IVT2 = new IfValidNotTest2();

describe("IfValid Validation", () => {
  it("should validate p1 since p0 is invalid", () => {
    const key_p0 = getObjectPropertyKey(IVT1, "p0");
    const key_p1 = getObjectPropertyKey(IVT1, "p1");
    let oes = new ObjectErrors();
    validateProperty(IVT1, "p1", oes);
    expect(oes.valid).toBeFalsy();
    expect(oes.getErrors(key_p0)).toBeUndefined();
    expect(oes.getErrors(key_p1)).toBeUndefined();

    oes = new ObjectErrors();
    validateProperty(IVT1, "p0", oes);
    expect(oes.valid).toBeFalsy();
    expect(oes.getErrors(key_p0).length).toEqual(1);
  });

  it("should validate p1 since p0 is valid", () => {
    const key_p0 = getObjectPropertyKey(IVT2, "p0");
    const key_p1 = getObjectPropertyKey(IVT2, "p1");

    let oes = new ObjectErrors();
    validateProperty(IVT2, "p0", oes);
    expect(oes.valid).toBeTruthy();
    expect(oes.getErrors(key_p0)).toBeUndefined();
    validateProperty(IVT2, "p1", oes);
    expect(oes.valid).toBeFalsy();
    expect(oes.getErrors(key_p1)).not.toBeNull();
  });
});