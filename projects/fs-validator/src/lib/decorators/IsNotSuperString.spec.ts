import { IsNotSuperString, validate } from ".."

test("IsNotSuperString",()=> {
    class IsNotSuperStringDemo {
        @IsNotSuperString('ABC') alpha:string = 'AB'
    }
    const IB = new IsNotSuperStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})