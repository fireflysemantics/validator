import { IsMultibyte, ObjectErrors, validate } from ".."

test("IsMultibyte",()=> {
    class IsMultibyteDemo {
        @IsMultibyte() alpha:any = 'ひらがな・カタカナ、．漢字'
    }
    const IB = new IsMultibyteDemo()
    expect(validate(IB).valid).toBeTruthy()
})