import { IsBoolean, validate } from ".."

test("IsBoolean",()=> {
    class IsBooleanDemo {
        @IsBoolean() alpha:boolean = true
    }
    const IB = new IsBooleanDemo()
    expect(validate(IB).valid).toBeTruthy()
})