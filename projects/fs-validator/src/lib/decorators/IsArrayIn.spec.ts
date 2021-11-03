import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsArrayIn } from ".."

class TestIsArrayIn {
  @IsArrayIn([1,2,3])
  p0: any[] = [1,2]
}
const IAI1 = new TestIsArrayIn()

test("IsArrayIn", () => {
  let key_p0 = getPropertyKey(IAI1, "p0")
  let oes = new ObjectErrors()
  validateProperty(IAI1, "p0", oes)
  expect(oes.valid).toBeTruthy()
//  expect(oes.getErrors(key_p0)).toBeUndefined()
//  expect(validate(IAI1).valid).toBeTruthy()
})