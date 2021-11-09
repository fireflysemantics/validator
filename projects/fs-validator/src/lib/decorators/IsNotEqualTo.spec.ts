import { IsNotEqualTo, validate } from ".."

test("IsNotEqualTo",()=> {
    class IsNotEqualToDemo {
        @IsNotEqualTo(2) alpha:number = 1
    }
    const IB = new IsNotEqualToDemo()
    expect(validate(IB).valid).toBeTruthy()
})