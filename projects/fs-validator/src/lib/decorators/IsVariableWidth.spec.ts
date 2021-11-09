import { IsVariableWidth, validate } from ".."

test("IsVariableWidth",()=> {
    class IsVariableWidthDemo {
        @IsVariableWidth() alpha:string = 'ひらがなカタカナ漢字ABCDE'
    }
    const IB = new IsVariableWidthDemo()
    expect(validate(IB).valid).toBeTruthy()
})