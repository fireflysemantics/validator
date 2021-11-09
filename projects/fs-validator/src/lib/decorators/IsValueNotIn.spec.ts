import { IsValueNotIn, validate } from ".."

test("IsValueNotIn",()=> {
    class IsValueNotInDemo {
        @IsValueNotIn([2,2]) alpha:number = 1
    }
    const IB = new IsValueNotInDemo()
    expect(validate(IB).valid).toBeTruthy()
})