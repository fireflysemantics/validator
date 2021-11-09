import { IsHexColor, validate } from ".."

test("IsHexColor",()=> {
    class IsHexColorDemo {
        @IsHexColor() alpha:string = 'deadBEEF'
    }
    const IB = new IsHexColorDemo()
    expect(validate(IB).valid).toBeTruthy()
})