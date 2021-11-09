import { IsAlpha, validate } from ".."

test("IsAlpha",()=> {
    class IsAlphaDemo {
        @IsAlpha() alpha:string = 'abc'
    }
    const IA = new IsAlphaDemo()
    expect(validate(IA).valid).toBeTruthy()
})