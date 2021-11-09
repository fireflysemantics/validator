import { IsJSON, validate } from ".."
test("IsJSON",()=> {
    class IsJSONDemo {
        @IsJSON() alpha:any = '{ "key": "value" }'
    }
    const IB = new IsJSONDemo()
    expect(validate(IB).valid).toBeTruthy()
})