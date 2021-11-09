import { IsIP, validate } from ".."

test("IsIP",()=> {
    class IsIPDemo {
        @IsIP() alpha:any = '127.0.0.1'
    }
    const IB = new IsIPDemo()
    expect(validate(IB).valid).toBeTruthy()
})