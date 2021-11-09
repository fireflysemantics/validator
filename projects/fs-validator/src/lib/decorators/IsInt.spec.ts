import { IsInt, validate } from ".."

test("IsIntString",()=> {
    class IsIntDemo {
        @IsInt() alpha:any = 1
    }
    const IB = new IsIntDemo()
    expect(validate(IB).valid).toBeTruthy()
})