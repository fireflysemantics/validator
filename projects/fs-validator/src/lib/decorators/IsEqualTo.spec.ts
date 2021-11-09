import { IsEqualTo, validate } from ".."

test("IsEqualTo",()=> {
    class IsEqualToDemo {
        @IsEqualTo(2) alpha:number = 2
    }
    const IB = new IsEqualToDemo()
    expect(validate(IB).valid).toBeTruthy()
})