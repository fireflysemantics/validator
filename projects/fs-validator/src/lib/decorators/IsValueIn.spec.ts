import { validate } from "../validate"
import { IsValueIn } from './IsValueIn'

class Person {
  @IsValueIn(['PETER', 'PAM'])
    name:string = "Jim"
}


const p = new Person()

test('IsValueIn', ()=>{
  expect(validate(p).valid).toBeFalsy()
  p.name = 'PETER'
  expect(validate(p).valid).toBeTruthy()
  p.name = 'PAM'
  expect(validate(p).valid).toBeTruthy()
  p.name = 'JIM'
  expect(validate(p).valid).toBeFalsy()
//  console.log(validate(p))
})