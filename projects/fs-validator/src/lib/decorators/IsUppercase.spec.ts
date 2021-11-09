import { IsUpperCase, validate } from ".."

test("IsUpperCase",()=> {
    class IsUpperCaseDemo {
        @IsUpperCase() alpha:string = 'AB'
    }
    const IB = new IsUpperCaseDemo()
    expect(validate(IB).valid).toBeTruthy()
})