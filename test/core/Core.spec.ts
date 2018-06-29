import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";

import { Core } from "./Core";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";

import { expect } from "chai";
import "mocha";
import { PREFIX_SINGLE, PREFIX_EACH } from "@fireflysemantics/constants";
const { getOwnPropertyNames } = Object;
const { getValidationContextValues } = ValidationContainer;

const cno_p0_array = "p0";
const cno_p1 = "p1";

class CoreNoOptions {
  @Core() p0: Number[] = [1, 2];
  @Core() p1: String = "";
}

class CoreUndecorated {
  p2: string = "";
}
const cu = new CoreUndecorated();
const cu_p2 = "p2";


const options: ValidationOptions = {
  message: (vc: ValidationContext, value: any) => "Valid"
};

class CoreWithOptions {
  @Core(options) p3: String = "";
}

const cwo = new CoreWithOptions();
const cwo_p3 = "p3";

//instance must be of type any
//otherwise typescript complains
//that there is no index signature
//when we attempt to retrieve property values
const cno: any = new CoreNoOptions();

describe("Core Validation Context Initialization", () => {
  it("should generate a ValidationContext instance for each property decorated.", () => {
    getOwnPropertyNames(cno).forEach(pn => {
      const key: string = getValidationContextKey(cno.constructor.name, pn);
      const validators = getValidationContextValues(key);
      expect(validators.length).to.equal(1);
      expect(validators[0] instanceof ValidationContext).to.be.true;
    });
  });

  it("should not generate a ValidationContexts if the property is not decorated.", () => {
    let key: string = getValidationContextKey(cu.constructor.name, cu_p2);
    expect(getValidationContextValues(key)).to.be.null;
  });

  it("should have accurately mapped ValidationContext values.", () => {
    getOwnPropertyNames(cno).forEach(pn => {
      let key: string = getValidationContextKey(cno.constructor.name, pn);

      const vc = getValidationContextValues(key)[0];

      expect(vc.object.constructor.name).to.equal(cno.constructor.name);
      expect(vc.decorator).to.equal(Core.name);
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(cno.constructor.name);
      expect(vc.validationOptions).to.be.undefined;
      expect(vc.validationParameters).to.be.undefined;
      expect(vc.validationTypeOptions).to.be.undefined;

    });
    const key: string = getValidationContextKey(cwo.constructor.name, cwo_p3);
    const vc = getValidationContextValues(key)[0];
    expect(vc.validationOptions).to.be.exist;
  });

});

describe("Core Messages", () => {
  it("should prefix the error message with PREFIX_SINGLE when the value is not an array", () => {
    let key: string = getValidationContextKey(cno.constructor.name, cno_p1);
    let vc = getValidationContextValues(key)[0];
    expect(vc.errorMessage(vc, cno)).to.contain(PREFIX_SINGLE);
  });

  it("should prefix the message string with the PREFIX_EACH is an array", () => {
    let key: string = getValidationContextKey(
      cno.constructor.name,
      cno_p0_array
    );
    let vc = getValidationContextValues(key)[0];
    expect(vc.errorMessage(vc, cno)).to.contain(PREFIX_EACH);
  });
});