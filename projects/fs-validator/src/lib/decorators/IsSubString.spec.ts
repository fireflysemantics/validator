import { IsSubString, validate } from ".."

test("IsSubString",()=> {
    class IsSubStringDemo {
        @IsSubString('ABC') alpha:string = 'AB'
    }
    const IB = new IsSubStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})