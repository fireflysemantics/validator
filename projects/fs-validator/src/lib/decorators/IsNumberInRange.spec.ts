import { IfValid } from "./IfValid"
import { getPropertyKey } from "../utilities"
import { validateProperty, validate } from "../validate"
import { ObjectErrors } from "../ObjectErrors"

import { IsDate } from "./IsDate"
import { IsAfterInstant } from "./IsAfterInstant"
import { IsNumberInRange } from './IsNumberInRange'

class SomeNumber {
  @IsNumberInRange(0,1)
    inRange:number
}

const so = new SomeNumber()

test('IsNumberInRange', ()=>{
  so.inRange = 0.5
  expect(validate(so).valid).toBeTruthy()
  so.inRange = 1
  expect(validate(so).valid).toBeTruthy()
  so.inRange = 0
  expect(validate(so).valid).toBeTruthy()
  so.inRange = 2
  expect(validate(so).valid).toBeFalsy()
  so.inRange = -1e-5
  expect(validate(so).valid).toBeFalsy()
  so.inRange = 1+1e-5
  expect(validate(so).valid).toBeFalsy()  
  expect(validate(so).errors.length).toEqual(1)
  expect(validate(so).errors[0].message.indexOf('inRange')!==-1).toBeTruthy()
})