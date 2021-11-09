import { IsNumber, validate } from ".."

test("IsNumber",()=> {
    class IsNumberDemo {
        @IsNumber() alpha:number = 2
    }
    const IB = new IsNumberDemo()
    expect(validate(IB).valid).toBeTruthy()
})