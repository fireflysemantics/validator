import { IsNegative, ObjectErrors, validate } from ".."

test("IsNegative",()=> {
    class IsNegativeDemo {
        @IsNegative() alpha:any = -1
    }
    const IB = new IsNegativeDemo()
    expect(validate(IB).valid).toBeTruthy()
})