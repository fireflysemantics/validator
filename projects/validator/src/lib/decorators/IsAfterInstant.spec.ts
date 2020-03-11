import { IfValid } from "./IfValid"
import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsDate } from "./IsDate"
import { IsAfterInstant } from "./IsAfterInstant"

class IsAfterInstant2 {
  @IsDate()
  p0: Date = new Date(1)

  @IsAfterInstant("p0")
  @IfValid("p0")
  p1: Date = new Date(0)
}

const IAI2 = new IsAfterInstant2()

class IsAfterInstant3 {
  @IsAfterInstant(new Date(0))
  p0: Date = new Date(1)
}

const IAI3 = new IsAfterInstant3()

describe("IsAfterInstant Validation", () => {
  class IsAfterInstant1 {
    @IsDate()
    p0: Date = new Date(0)

    @IsAfterInstant("p0")
    @IfValid("p0")
    p1: Date = new Date(1)
  }

  const IAI1 = new IsAfterInstant1()

  it("should work like this", () => {
    let key_p0 = getPropertyKey(IAI1, "p0")
    let key_p1 = getPropertyKey(IAI1, "p1")

    let oes = new ObjectErrors()
    validateProperty(IAI1, "p1", oes)

    expect(oes.valid).toBeTruthy()
    expect(oes.getErrors(key_p0)).toBeUndefined()
    expect(oes.getErrors(key_p1)).toBeUndefined()

    oes = validate(IAI1)
    expect(oes.valid).toBeTruthy()

    expect(oes.getErrors(key_p0)).toBeUndefined()
    expect(oes.getErrors(key_p1)).toBeUndefined()
    key_p0 = getPropertyKey(IAI2, "p0")
    key_p1 = getPropertyKey(IAI2, "p1")

    oes = validate(IAI2)
    expect(oes.valid).toBeFalsy()
    expect(oes.getErrors(key_p0)).toBeUndefined()
    expect(oes.getErrors(key_p1)).not.toBeNull()

    expect(validate(IAI3).valid).toBeTruthy()
  })
})
