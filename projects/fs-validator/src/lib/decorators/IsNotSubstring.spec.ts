import { IsNotSubString, validate } from ".."

test("IsNotSubString",()=> {
    class IsNotSubStringDemo {
        @IsNotSubString('AB') alpha = 'ABC'
    }
    const IB = new IsNotSubStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})