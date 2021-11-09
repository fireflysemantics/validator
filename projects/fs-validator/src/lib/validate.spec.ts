import { getPropertyKey } from "./utilities";
import { validate, validateProperty,validateN } from "./validate";
import { IsDefined } from './decorators/IsDefined'
import { ObjectErrors } from './ObjectErrors'

export class Valid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}
const V = new Valid();

class Invalid {
  @IsDefined() p0: any = null;
}
const I = new Invalid();

test('validate()', ()=>{
  let oes = validate(V);
  expect(oes.valid).toBeTruthy();
  let key = getPropertyKey(V, 'p1');//Valid_p1
  expect(oes.getErrors(key)).toBeUndefined();
  expect(oes.errors.length).toEqual(0);

  oes = validate(I);
  expect(oes.valid).toBeFalsy();
  key = getPropertyKey(I, 'p0');//Invalid_p0
  expect(oes.getErrors(key).length).toBeGreaterThan(0);
  expect(oes.errors[0].errorMessage).toContain('p0');
})

test('validateN', ()=>{
  let entities:any[] = [ new Invalid(), new Invalid()]
  let oesArr:ObjectErrors[] = validateN(entities)
  expect(oesArr[0].valid).toBeFalsy();
  expect(oesArr[1].valid).toBeFalsy();

  entities = [ new Valid(), new Valid()]
  oesArr = validateN(entities)
  expect(oesArr.length).toEqual(0);
})

test("validateProperty()", () => {
  let oes = new ObjectErrors();
  expect(validateProperty(I, 'p0', oes)).toBeFalsy();
  const key = getPropertyKey(I, 'p0');
  expect(oes.getErrors(key).length).toBeGreaterThan(0);
});