import { IsPositive, validate } from ".."

test("IsPositive",()=> {
    class IsPositiveDemo {
        @IsPositive() alpha:number= 2
    }
    const IB = new IsPositiveDemo()
    expect(validate(IB).valid).toBeTruthy()
})