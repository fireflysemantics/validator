import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsAscii } from ".."

class TestIsAscii {
  @IsAscii()
  p0: string = 'abc'
}
const IANI1 = new TestIsAscii()

test("IsAscii", () => {
  let key_p0 = getPropertyKey(IANI1, "p0")
  let oes = new ObjectErrors()
  validateProperty(IANI1, "p0", oes)
  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_p0)).toBeUndefined()
  expect(validate(IANI1).valid).toBeTruthy()
})