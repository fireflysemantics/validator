import { IsNumberString, validate } from ".."

test("IsNumberString",()=> {
    class IsNumberStringDemo {
        @IsNumberString() alpha:string = '2'
    }
    const IB = new IsNumberStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})