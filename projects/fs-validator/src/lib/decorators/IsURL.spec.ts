import { IsURL, validate } from ".."

test("IsURL",()=> {
    class IsURLDemo {
        @IsURL() alpha:string = 'example.com'
    }
    const IB = new IsURLDemo()
    expect(validate(IB).valid).toBeTruthy()
})