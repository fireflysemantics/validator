import { IfValid } from "./IfValid"
import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsDate } from "./IsDate"
import { IsBeforeInstant } from "./IsBeforeInstant"

const before = "before"
const after = "after"

class IsNotBeforeInstant {
  @IsBeforeInstant(new Date(1))
  before: Date = new Date(2)
}
const INBI = new IsNotBeforeInstant()

class IsNotBeforeInstant1 {
  @IsDate()
  after: Date = new Date(1)

  @IsBeforeInstant("after")
  @IfValid("after")
  before: Date = new Date(2)
}
const INB1 = new IsNotBeforeInstant1()

class IsBeforeInstant1 {
  @IsDate()
  after: Date = new Date(2)

  @IsBeforeInstant("after")
  before: Date = new Date(1)
}
const IBI1 = new IsBeforeInstant1()

class IsBeforeInstant2 {
  @IsBeforeInstant(new Date(0))
  before: Date = new Date(-1)
}
const IBI2 = new IsBeforeInstant2()
/*
test("IsBeforeInstant", ()=>{
  let key_before = getPropertyKey(INBI, before)
  let oes = new ObjectErrors()

  validateProperty(INBI, before, oes)
  expect(oes.valid).toBeFalsy()
  
  expect(oes.getErrors(key_before)).toBeDefined()
  expect(oes.getErrors(key_before).length).toEqual(1)
  expect(oes.getErrors(key_before)[0].errorMessage).toContain(before)

  oes = validate(INB1)
  expect(oes.valid).toBeFalsy()
  expect(oes.getErrors(key_before)).toBeUndefined()
  expect(oes.getErrors(key_before)).not.toBeNull()
})
*/
test("IsBeforeInstant", () => {
  let key_before = getPropertyKey(IBI1, before)
  let key_after = getPropertyKey(IBI1, after)

  let oes = new ObjectErrors()
  validateProperty(IBI1, before, oes)
  expect(oes.valid).toBeTruthy()
//  expect(oes.getErrors(key_before)).toBeUndefined()
  //expect(oes.getErrors(key_after)).toBeUndefined()

//  oes = validate(IBI1)
  //expect(oes.valid).toBeTruthy()
/*

  expect(oes.getErrors(key_before)).toBeUndefined()
  expect(oes.getErrors(key_after)).toBeUndefined()

  expect(validate(IBI2).valid).toBeTruthy()*/
})