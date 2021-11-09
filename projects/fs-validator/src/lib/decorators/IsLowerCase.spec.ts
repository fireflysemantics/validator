import { IsLowerCase, ObjectErrors, validate } from ".."

test("IsLowerCase",()=> {
    class IsLowerCaseDemo {
        @IsLowerCase() alpha:any = '2009-05-19'
    }
    const IB = new IsLowerCaseDemo()

    expect(validate(IB).valid).toBeTruthy()

})