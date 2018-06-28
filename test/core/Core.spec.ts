import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";

import { Core } from "./Core";
import { getValidationContextKey } from "@fireflysemantics/utilities/utilities";

import { expect } from "chai";
import "mocha";

const coreNoOptions_p1 = "p1";
const coreNoOptions_p2 = "p2";
const coreWithOptions_p3 = "p3";
const coreWithOptions_p4 = "p4";

class CoreNoOptions {
  @Core() p1: String = "";
  p2: string = "";
}

const options: ValidationOptions = {
  message: (vc: ValidationContext, value: any) => "Valid"
}

class CoreWithOptions {
  @Core(options) p3: String = "";
  p4: string = "";
}


describe("Global", () => {
  it("should not generate a ValidationContexts array if the property is not decorated.", () => {
    //instance must be of type any
    //otherwise typescript complains
    //that there is no index signature
    //when we attempt to retrieve property values
    const instance: any = new CoreNoOptions();
    let key: string = getValidationContextKey(instance.constructor.name, coreNoOptions_p2);

    let validators = 
        <Array<ValidationContext>>ValidationContainer.getValidationContextValues(key);
    
    expect(validators).to.be.null;
    key = getValidationContextKey(instance.constructor.name, "p1");

    validators = ValidationContainer.getValidationContextValues(key);
    expect(validators.length).to.equal(1);
  });

  it("should return the default message string by default", () => {
    const instance: any = new CoreNoOptions();
    let key: string = getValidationContextKey(instance.constructor.name, "p1");
    let validators =
        ValidationContainer.getValidationContextValues(key);

    const vc = validators[0]; 
    expect(vc.errorMessage(vc, 'negligible')).to.equal("Value(s) assigned to p1 must be defined.");
  });

  it("should prefix the message string with each when each is supplied", () => {
    const instance: any = new CoreNoOptions();
    let key: string = getValidationContextKey(instance.constructor.name, "p1");
    let validators =
        ValidationContainer.getValidationContextValues(key);
    const vc = validators[0];
    expect(vc.errorMessage(vc, 'negligible')).to.equal("Value(s) assigned to p1 must be defined.");
  });
});