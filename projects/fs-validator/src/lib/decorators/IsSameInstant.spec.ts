import { IsSameInstant, validate } from ".."

test("IsSameInstant",()=> {
    class IsSameInstantDemo {
        @IsSameInstant(new Date(1)) alpha:Date = new Date(1)
    }
    const IB = new IsSameInstantDemo()
    expect(validate(IB).valid).toBeTruthy()
})