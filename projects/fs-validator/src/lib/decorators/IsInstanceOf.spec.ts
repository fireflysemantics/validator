import { IsInstanceOf, validate } from ".."

test("IsInstanceOf",()=> {
    class IsInstanceOfDemo {
        @IsInstanceOf(Date) alpha:any = new Date(1)
    }
    const IB = new IsInstanceOfDemo()
    expect(validate(IB).valid).toBeTruthy()
})