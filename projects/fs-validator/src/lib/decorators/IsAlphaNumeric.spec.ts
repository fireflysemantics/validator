import { IsAlphaNumeric, validate } from ".."

test("IsAlphaNumeric",()=> {
    class IsAlphaNumericDemo {
        @IsAlphaNumeric() alpha:string = '1'
    }
    const IAN = new IsAlphaNumericDemo()
    expect(validate(IAN).valid).toBeTruthy()
})