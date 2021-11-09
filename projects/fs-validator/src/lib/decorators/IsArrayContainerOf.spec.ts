import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"
import { IsArrayContainerOf } from ".."

class TestIsArrayNotIn {
  @IsArrayContainerOf([1,2,3])
  p0: any[] = [1,2,3,4]
}
const IACO = new TestIsArrayNotIn()

test("IsArrayContainerOf", () => {
  let key_p0 = getPropertyKey(IACO, "p0")
  let oes = new ObjectErrors()
  validateProperty(IACO, "p0", oes)
  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_p0)).toBeUndefined()
  expect(validate(IACO).valid).toBeTruthy()
})