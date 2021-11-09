import { getPropertyKey } from "../utilities"
import { ObjectErrors } from "../ObjectErrors"
import { validateProperty, validate, IsBase64 } from ".."

class TestIsBase64 {
  @IsBase64()
  p0: string = 'Zg=='
}
const IANI1 = new TestIsBase64()

test("IsBase64", () => {
  let key_p0 = getPropertyKey(IANI1, "p0")
  let oes = new ObjectErrors()
  validateProperty(IANI1, "p0", oes)
  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_p0)).toBeUndefined()
  expect(validate(IANI1).valid).toBeTruthy()
})