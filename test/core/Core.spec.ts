import { ValidationContainer } from "@fs/container/validation/ValidationContainer";
import { ValidationContext } from "@fs/container/validation/ValidationContext";
import { ValidationOptions } from "@fs/container/validation/ValidationOptions";

import { Core1 } from "@test/core/Core1";
import { Core2 } from "@test/core/Core2";
import { getValidationContextContainerKey } from "@fs/utilities/utilities";

import { expect } from "chai";
import "mocha";
import { PREFIX_SINGLE, PREFIX_EACH } from "@fs/constants";
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
    let key: string = getValidationContextContainerKey(cs, "p3");
    const validators = ValidationContainer.cache[key];
    expect(validators.vcs[0].decorator).to.equal(Core1.name);
    expect(validators.vcs[1].decorator).to.equal(Core2.name);
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
    expect(cno.constructor.name).to.equal('CoreNoOptions');
    expect(ValidationContainer.metaClasses['CoreNoOptions']).to.exist;
    expect(ValidationContainer.metaClasses[cu.constructor.name]).to.not.exist;
    expect(ValidationContainer.metaClasses['CoreNoOptions'].properties.length).to.equal(2);
    expect(ValidationContainer.metaClasses['CoreWithOptions'].properties.length).to.equal(1);
    expect(ValidationContainer.metaClasses['CoreWithOptions'].properties.includes("p3")).to.be.true;    
  });
});

describe("Core Validation Context Initialization", () => {
  it("should generate a ValidationContext instance for each property decorated.", () => {
    getOwnPropertyNames(cno).forEach(pn => {
      const key: string = getValidationContextContainerKey(cno, pn);
      const validators = ValidationContainer.cache[key].vcs;
      expect(validators.length).to.equal(1);
      expect(validators[0] instanceof ValidationContext).to.be.true;
    });
  });

  it("should not generate a ValidationContexts if the property is not decorated.", () => {
    let key: string = getValidationContextContainerKey(cu.constructor.name, cu_p2);
    const validators = ValidationContainer.cache[key];
    expect(validators).to.be.undefined;
  });

  it("should have accurately mapped ValidationContext values.", () => {
    getOwnPropertyNames(cno).forEach(pn => {

      let key: string = getValidationContextContainerKey(cno.constructor.name, pn);
      const validators = ValidationContainer.cache[key].vcs;
      const vc = validators[0];

      expect(vc.object.constructor.name).to.equal(cno.constructor.name);
      expect(vc.decorator).to.equal(Core1.name);
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(cno.constructor.name);
      expect(vc.validationOptions).to.be.undefined;
      expect(vc.validationParameters).to.be.undefined;
      expect(vc.validationTypeOptions).to.be.undefined;

    });

    const key: string = getValidationContextContainerKey(cwo.constructor.name, cwo_p3);
    const validators = ValidationContainer.cache[key].vcs;

    const vc = validators[0];
    expect(vc.validationOptions).to.be.exist;
  });
});

describe("Core Messages", () => {
  it("should prefix the error message with PREFIX_SINGLE when the value is not an array", () => {
    let key: string = getValidationContextContainerKey(cno.constructor.name, cno_p1);
    const validators = ValidationContainer.cache[key].vcs;

    let vc = validators[0];
    expect(vc.errorMessage(vc, cno)).to.contain(PREFIX_SINGLE);
  });

  it("should prefix the message string with the PREFIX_EACH is an array", () => {
    let key: string = getValidationContextContainerKey(
      cno.constructor.name,
      cno_p0_array
    );
    const validators = ValidationContainer.cache[key].vcs;
    let vc = validators[0];
    expect(vc.errorMessage(vc, cno)).to.contain(PREFIX_EACH);
  });
});