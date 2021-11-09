import { IsIntString, validate } from ".."

test("IsIntString",()=> {
    class IsIntStringDemo {
        @IsIntString() alpha:any = '1'
    }
    const IB = new IsIntStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})