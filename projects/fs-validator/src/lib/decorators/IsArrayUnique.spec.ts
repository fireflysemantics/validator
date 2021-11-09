import { getPropertyKey } from "../utilities"
import { ObjectErrors } from "../ObjectErrors"

import { IsArrayUnique, validateProperty, validate  } from ".."

class TestIsArrayUnique {
  @IsArrayUnique()
  p0: any[] = [1,2,4]
}
const IANI1 = new TestIsArrayUnique()

test("IsArrayUnique", () => {
  let key_p0 = getPropertyKey(IANI1, "p0")
  let oes = new ObjectErrors()
  validateProperty(IANI1, "p0", oes)
  expect(oes.valid).toBeTruthy()
  expect(oes.getErrors(key_p0)).toBeUndefined()
  expect(validate(IANI1).valid).toBeTruthy()
})