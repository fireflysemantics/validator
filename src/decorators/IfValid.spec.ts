import { IsDefined } from "./IsDefined";
import { IfValid } from "./IfValid";
import { ObjectErrors } from "@fs/container/error/";
import { getPropertyKey } from "@fs/utilities/utilities";
import { validateProperty } from "@fs/utilities/utilities";

describe("IfValid Validation", () => {

  class IfValidNotTest1 {
    @IsDefined() 
    p0: any = null; //Property not valid
  
    @IsDefined() 
    @IfValid("p0")
    p1: any = null;
  }
  
  const IVT1 = new IfValidNotTest1();  

  it("should not perform @IsDefined validation on p1 since p0 is invalid", () => {
    
    const key_p0 = getPropertyKey(IVT1, "p0");
    const key_p1 = getPropertyKey(IVT1, "p1");

    let oes = new ObjectErrors();    
    validateProperty(IVT1, "p1", oes);
    expect(oes.valid).toBeFalsy();

    expect(oes.getErrors(key_p0)).toBeUndefined();
    expect(oes.getErrors(key_p1).length).toEqual(1);

    
    expect(oes.getErrors(key_p1)[0].vc.decorator).toEqual("IfValid");

    //Verify that p0 is invalid
    oes = new ObjectErrors();
    validateProperty(IVT1, "p0", oes);
    expect(oes.valid).toBeFalsy();
    expect(oes.getErrors(key_p0).length).toEqual(1);
    expect(oes.getErrors(key_p0)[0].vc.decorator).toEqual("IsDefined");
  });

  class IfValidNotTest2 {
    @IsDefined() 
    p0: any = 'valid'; //Property not valid
  
    @IsDefined() 
    @IfValid("p0")
    p1: any = null;
  }
  
  const IVT2 = new IfValidNotTest2();
  it("should execute @IsDefined validation on p1 since p0 is valid", () => {
    const key_p0 = getPropertyKey(IVT2, "p0");
    const key_p1 = getPropertyKey(IVT2, "p1");

    let oes = new ObjectErrors();
    validateProperty(IVT2, "p0", oes);
    expect(oes.valid).toBeTruthy();
    expect(oes.getErrors(key_p0)).toBeUndefined();
    validateProperty(IVT2, "p1", oes);
    expect(oes.valid).toBeFalsy();
    expect(oes.getErrors(key_p1)).not.toBeNull();
    expect(oes.getErrors(key_p1)[0].vc.decorator).toEqual("IsDefined");
  });
});