import { IsDivisibleBy, validate } from ".."

test("IsDivisibleBy",()=> {
    class IsDivisibleByDemo {
        @IsDivisibleBy(2) alpha:number = 10
    }
    const IB = new IsDivisibleByDemo()
    expect(validate(IB).valid).toBeTruthy()
})