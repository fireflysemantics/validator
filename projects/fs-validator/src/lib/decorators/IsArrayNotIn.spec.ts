import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsArrayNotIn } from ".."

class TestIsArrayNotIn {
  @IsArrayNotIn([1,2,3])
  p0: any[] = [1,2,4]
}
const IANI1 = new TestIsArrayNotIn()

test("IsArrayIn", () => {
  let key_p0 = getPropertyKey(IANI1, "p0")
  let oes = new ObjectErrors()
  validateProperty(IANI1, "p0", oes)
  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_p0)).toBeUndefined()
  expect(validate(IANI1).valid).toBeTruthy()
})