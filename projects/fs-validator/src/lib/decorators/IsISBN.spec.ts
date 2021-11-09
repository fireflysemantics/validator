import { IsISBN, validate } from ".."

test("IsISBN",()=> {
    class IsIntStringDemo {
        @IsISBN(10) alpha:any = '3-8362-2119-5'
    }
    const IB = new IsIntStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})