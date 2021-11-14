import { IsIP, validate } from ".."

test("IsIP",()=> {
    class IsIPDemo {
        @IsIP() alpha:any = '127.0.0.1'
    }
    const IB = new IsIPDemo()
    const errors = validate(IB).errors
    expect(errors.length).toEqual(0)
    expect(validate(IB).valid).toBeTruthy()
})