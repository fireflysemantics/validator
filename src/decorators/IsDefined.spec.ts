import { ValidationContainer } from "@fireflysemantics/container/validation/ValidationContainer";
import { ValidationContext } from "@fireflysemantics/container/validation/ValidationContext";
import {
  isDefined,
  getValidationContextKey
} from "@fireflysemantics/utilities/utilities";

import { IsDefined } from "@fireflysemantics/decorators/IsDefined";
import { expect } from "chai";
import { NoOptionsValid, NoOptionsInvalid, NoOptionsValidArray, Options } from "@test/decorators/IsDefined";
import "mocha";

const nov: any = new NoOptionsValid();


describe("IsDefined", () => {
  it("should generate a ValidationContext instance for each property decorated.", () => {
    //instance must be of type any
    //otherwise typescript complains
    //that there is no index signature
    //when we attempt to retrieve property values
    Object.getOwnPropertyNames(nov).forEach(pn => {
      const key: string = getValidationContextKey(nov.constructor.name, pn);
      
      const validators: Array<ValidationContext> = 
            ValidationContainer.getValidationContextValues(key);

      expect(validators.length).to.equal(1);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(nov.constructor.name);

      expect(vc.validate(nov[pn])).to.be.true;
    });
  });

  it("should return true when using the ValidationContext.validate method to check valid values.", () => {
    Object.getOwnPropertyNames(nov).forEach(pn => {
      const key: string = getValidationContextKey(nov.constructor.name, pn);
      const validators = 
            ValidationContainer.getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(nov.constructor.name);

      expect(vc.validate(nov[pn])).to.be.true;
    });
  });

  it("should return false when using the validate method to check invalid values.", () => {

    const invalid:any = new NoOptionsInvalid();
    
    Object.getOwnPropertyNames(invalid).forEach(pn => {
      const key: string = getValidationContextKey(invalid.constructor.name, pn);
      const validators = 
            ValidationContainer.getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.validate(invalid[pn])).to.be.false;
    });
  });

  it("should have accurately mapped ValidationContext values.", () => {
    const o: any = new Options();

    Object.getOwnPropertyNames(o).forEach(pn => {
      const key: string = getValidationContextKey(o.constructor.name, pn);

      const validators: Array<ValidationContext> = 
            ValidationContainer.getValidationContextValues(key);

      const vc: ValidationContext = validators[0];
      expect(vc.object.constructor.name).to.equal(o.constructor.name);
      expect(vc.decorator).to.equal(IsDefined.name);
      expect(vc.propertyName).to.equal(pn);
      expect(vc.target.name).to.equal(o.constructor.name);
      expect(vc.validate).to.equal(isDefined);
      expect(vc.validationOptions).to.be.not.undefined;
      expect(vc.validationParameters).to.be.undefined;
      expect(vc.validationTypeOptions).to.be.undefined;
    });
  });

  it("Should have both single and each default message support", () => {
    const nova:any = new NoOptionsValidArray();
    const p4: string = 'p4';
    const p5: string = 'p5';

    let key = getValidationContextKey(nova.constructor.name, p4);
    let validators: Array<ValidationContext> = 
          ValidationContainer.getValidationContextValues(key);

    let vc: ValidationContext = validators[0];
    expect(vc.errorMessage(vc, nova[p4])).to.equal(`Each value in ${p4} should not be null or undefined`);

    key = getValidationContextKey(nova.constructor.name, p5);
    validators = 
          ValidationContainer.getValidationContextValues(key);

    vc = validators[0];
    expect(vc.errorMessage(vc, nova[p5])).to.equal(`The value contained by ${p5} should not be null or undefined`);
  });
});
