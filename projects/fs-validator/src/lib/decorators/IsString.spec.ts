import { IsString, validate } from ".."

test("IsString",()=> {
    class IsEqualToDemo {
        @IsString() alpha:string = 'AB'
    }
    const IB = new IsEqualToDemo()
    expect(validate(IB).valid).toBeTruthy()
})