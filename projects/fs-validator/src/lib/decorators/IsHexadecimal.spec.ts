import { IsHexadecimal, validate } from ".."

test("IsHexadecimal",()=> {
    class IsHexadecimalDemo {
        @IsHexadecimal() alpha:string = 'deadBEEF'
    }
    const IB = new IsHexadecimalDemo()
    expect(validate(IB).valid).toBeTruthy()
})