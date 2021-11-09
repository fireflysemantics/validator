import { IsFullWidth, validate } from ".."

test("IsFullWidth",()=> {
    class IsFullWidthDemo {
        @IsFullWidth() alpha:string = 'ひらがな・カタカナ、．漢字'
    }
    const IB = new IsFullWidthDemo()
    expect(validate(IB).valid).toBeTruthy()
})