import { ValidationContainer } from "../ValidationContainer";
import { ValidationContext } from "../ValidationContext";
import { getPropertyKey } from "../utilities";
import { IsEmail } from "./IsEmail";
const { getOwnPropertyNames } = Object;

class IsEmailValid {
  @IsEmail() e1: string = "foo@bar.com";
  @IsEmail() e2: string = "o@b.no";
  @IsEmail() e3: string = "o@b.no.eu";
  @IsEmail() e4: string = "bar-foo@bar.com";
  @IsEmail() e5: string = "bar+foo@bar.com";
  @IsEmail() e6: string = "bar.foo@bar.com";
  @IsEmail() e7: string = "端@bar.com";
  @IsEmail() e8: string = "foo@端.com";
}

const IEV: any = new IsEmailValid();

describe("IsEmail Validation", () => {
  it(`should return true when using 
      the ValidationContext.validate 
      method to check valid values`, () => {
    getOwnPropertyNames(IEV).forEach(pn => {
      const key: string = getPropertyKey(IEV.constructor.name, pn);
      const validators = ValidationContainer.cache.get(key);

      const vc: ValidationContext = validators[0];
      expect(vc.propertyName).toEqual(pn);
      expect(vc.target.name).toEqual(IEV.constructor.name);

      expect(vc.validateValue(vc, IEV)).toBeTruthy();
    });
  });

  class IsEmailInvalid {
    @IsEmail() e0: string = 'null';
    @IsEmail() e1: string = 'invalid@';
    @IsEmail() e2: string = 'invalid.com';
    @IsEmail() e3: string = 'noone@h o t m a i l.com';
    @IsEmail() e4: string = '@invalid@';
    @IsEmail() e5: string = '@invalid';
    @IsEmail() e6: string = 'invalid@';
  }
  const IEI: any = new IsEmailInvalid();  

  it(`should return false when using the 
      ValidationContext.validate method 
      to check invalid values`, () => {    
    Object.getOwnPropertyNames(IEI).forEach(pn => {
      const key: string = getPropertyKey(IEI, pn);
      const validators = ValidationContainer.cache.get(key);

      const vc: ValidationContext = validators[0];
      expect(vc.validateValue(vc, IEI)).toBeFalsy();
    });
  });
});