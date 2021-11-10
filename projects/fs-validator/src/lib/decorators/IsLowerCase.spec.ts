import { IsLowerCase, ObjectErrors, validate } from ".."

test("IsLowerCase",()=> {
    class IsLowerCaseDemo {
        @IsLowerCase() alpha:any = 'abc'
    }
    const IB = new IsLowerCaseDemo()

    expect(validate(IB).valid).toBeTruthy()

})