import { ValidationOptions } from "../../src/container/validation/ValidationOptions";
import { ValidationContext } from "../../src/container/validation/ValidationContext";
import { ValidationContainer } from "../../src/container/validation/ValidationContainer";

import { Core1 } from "./Core1";
import { Core2 } from "./Core2";
import { getObjectPropertyKey } from "../../src/utilities/utilities";

import { PREFIX_SINGLE, PREFIX_EACH } from "../../src/constants";
const { getOwnPropertyNames } = Object;

const cno_p0_array = "p0";
const cno_p1 = "p1";

class CoreNoOptions {
  @Core1() p0: Number[] = [1, 2];
  @Core1() p1: String = "";
}

class CoreUndecorated {
  p2: string = "";
}
const cu = new CoreUndecorated();
const cu_p2 = "p2";

class CoreSequence {
  @Core2() 
  @Core1() 
  p3: String = "";
}

const cs = new CoreSequence();

describe("ValidationContextContainer", ()=> {
  it("should guarantee the sequence of the validation decorators", ()=>{
    let key: string = getObjectPropertyKey(cs, "p3");
    const validators = ValidationContainer.cache[key];
    expect(validators.vcs[0].decorator).toEqual(Core1.name);
    expect(validators.vcs[1].decorator).toEqual(Core2.name);
  });
});


const options: ValidationOptions = {
  message: (vc: ValidationContext, value: any) => "Valid"
};

class CoreWithOptions {
  @Core1(options) p3: String = "";
}

const cwo = new CoreWithOptions();
const cwo_p3 = "p3";

//instance must be of type any
//otherwise typescript complains
//that there is no index signature
//when we attempt to retrieve property values
const cno: any = new CoreNoOptions();

describe("MetaClass cache initializaiton", ()=> {
  it("should create MetaClass instances", ()=>{
    expect(cno.constructor.name).toEqual('CoreNoOptions');
    expect(ValidationContainer.metaClasses['CoreNoOptions']).not.toBeNull();
    expect(ValidationContainer.metaClasses[cu.constructor.name]).toBeUndefined();
    expect(ValidationContainer.metaClasses['CoreNoOptions'].properties.length).toEqual(2);
    expect(ValidationContainer.metaClasses['CoreWithOptions'].properties.length).toEqual(1);
    expect(ValidationContainer.metaClasses['CoreWithOptions'].properties.includes("p3")).toBeTruthy();    
  });
});

describe("Core Validation Context Initialization", () => {
  it("should generate a ValidationContext instance for each property decorated.", () => {
    getOwnPropertyNames(cno).forEach(pn => {
      const key: string = getObjectPropertyKey(cno, pn);
      const validators = ValidationContainer.cache[key].vcs;
      expect(validators.length).toEqual(1);
      expect(validators[0] instanceof ValidationContext).toBeTruthy();
    });
  });

  it("should not generate a ValidationContexts if the property is not decorated.", () => {
    let key: string = getObjectPropertyKey(cu.constructor.name, cu_p2);
    const validators = ValidationContainer.cache[key];
    expect(validators).toBeUndefined();
  });

  it("should have accurately mapped ValidationContext values.", () => {
    getOwnPropertyNames(cno).forEach(pn => {

      let key: string = getObjectPropertyKey(cno.constructor.name, pn);
      const validators = ValidationContainer.cache[key].vcs;
      const vc = validators[0];

      expect(vc.object.constructor.name).toEqual(cno.constructor.name);
      expect(vc.decorator).toEqual(Core1.name);
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(cno.constructor.name);
      expect(vc.validationOptions).toBeUndefined();
      expect(vc.validationParameters).toBeUndefined();
      expect(vc.validationTypeOptions).toBeUndefined();
    });

    const key: string = getObjectPropertyKey(cwo.constructor.name, cwo_p3);
    const validators = ValidationContainer.cache[key].vcs;

    const vc = validators[0];
    expect(vc.validationOptions).not.toBeNull();
  });
});

describe("Core Messages", () => {
  it("should prefix the error message with PREFIX_SINGLE when the value is not an array", () => {
    let key: string = getObjectPropertyKey(cno.constructor.name, cno_p1);
    const validators = ValidationContainer.cache[key].vcs;

    let vc = validators[0];
    expect(vc.errorMessage(vc, cno)).toContain(PREFIX_SINGLE);
  });

  it("should prefix the message string with the PREFIX_EACH is an array", () => {
    let key: string = getObjectPropertyKey(
      cno.constructor.name,
      cno_p0_array
    );
    const validators = ValidationContainer.cache[key].vcs;
    let vc = validators[0];
    expect(vc.errorMessage(vc, cno)).toContain(PREFIX_EACH);
  });
});