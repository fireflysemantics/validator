import { IsInstanceOf, validate } from ".."

test("IsInstanceOf",()=> {
    class IsHexColorDemo {
        @IsInstanceOf(Date) alpha:any = new Date(1)
    }
    const IB = new IsHexColorDemo()
    expect(validate(IB).valid).toBeTruthy()
})