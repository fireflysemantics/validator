import { IsHexColor, validate } from ".."

test("IsHexColor",()=> {
    class IsHexColorDemo {
        @IsHexColor() alpha:string = '#ff0000ff'
    }
    const IB = new IsHexColorDemo()
    expect(validate(IB).valid).toBeTruthy()
})