import { IsNotEmpty, validate } from ".."

test("IsNotEmpty",()=> {
    class IsNotEmptyDemo {
        @IsNotEmpty() alpha:string = '2'
    }
    const IB = new IsNotEmptyDemo()
    expect(validate(IB).valid).toBeTruthy()
})