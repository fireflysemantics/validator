import { IsArrayNotEmpty, validate } from ".."

test("IsArrayNotEmpty",()=> {
    class IsArrayNotEmptyDemo {
        @IsArrayNotEmpty() 
        alpha:any[] = [1,2]
    }
    const IA = new IsArrayNotEmptyDemo()
    expect(validate(IA).valid).toBeTruthy()
})