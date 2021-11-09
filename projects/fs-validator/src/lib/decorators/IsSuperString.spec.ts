import { IsSuperString, validate } from ".."

test("IsSuperString",()=> {
    class IsSuperStringDemo {
        @IsSuperString('A') alpha:string = 'AB'
    }
    const IB = new IsSuperStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})