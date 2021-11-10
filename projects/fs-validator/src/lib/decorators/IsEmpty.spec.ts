import { IsEmpty, validate } from ".."

test("IsEmpty",()=> {
    class IsEmptyDemo {
        @IsEmpty() alpha:string = ''
    }
    class IsNotEmptyDemo {
        @IsEmpty() alpha:string = 'notempty'
    }

    const IB = new IsEmptyDemo()
    expect(validate(IB).valid).toBeTruthy()
    const INE = new IsNotEmptyDemo()
    expect(validate(INE).valid).toBeFalsy()
})