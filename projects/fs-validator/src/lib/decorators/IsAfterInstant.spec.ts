import { IfValid } from "./IfValid"
import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsDate } from "./IsDate"
import { IsAfterInstant } from "./IsAfterInstant"

class IsNotAfterInstant {
  @IsAfterInstant(new Date(1))
  after: Date = new Date(1)
}
const INAI = new IsNotAfterInstant()

class IsNotAfterInstant1 {
  @IsDate()
  before: Date = new Date(1)

  @IsAfterInstant("before")
  @IfValid("before")
  after: Date = new Date(0)
}
const INA1 = new IsNotAfterInstant1()


class IsAfterInstant1 {
  @IsDate()
  before: Date = new Date(0)

  @IsAfterInstant("before")
  @IfValid("before")
  after: Date = new Date(1)
}
const IAI1 = new IsAfterInstant1()

class IsAfterInstant2 {
  @IsAfterInstant(new Date(0))
  p0: Date = new Date(1)
}
const IAI2 = new IsAfterInstant2()

test("IsAfterInstant", ()=>{
  let key_before = getPropertyKey(INAI, "before")
  let key_after = getPropertyKey(INAI, "after")
  let oes = new ObjectErrors()

  validateProperty(INAI, "after", oes)
  expect(oes.valid).toBeFalsy()
  expect(oes.getErrors(key_after)).toBeDefined()
  expect(oes.getErrors(key_after).length).toEqual(1)
  expect(oes.getErrors(key_after)[0].errorMessage).toContain('after')

  oes = validate(INA1)
  expect(oes.valid).toBeFalsy()
  expect(oes.getErrors(key_before)).toBeUndefined()
  expect(oes.getErrors(key_after)).not.toBeNull()
})

test("IsAfterInstant", () => {
  let key_before = getPropertyKey(IAI1, "before")
  let key_after = getPropertyKey(IAI1, "after")

  let oes = new ObjectErrors()
  validateProperty(IAI1, "after", oes)

  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_before)).toBeUndefined()
  expect(oes.getErrors(key_after)).toBeUndefined()

  oes = validate(IAI1)
  expect(oes.valid).toBeTruthy()

  expect(oes.getErrors(key_before)).toBeUndefined()
  expect(oes.getErrors(key_after)).toBeUndefined()

  expect(validate(IAI2).valid).toBeTruthy()
})