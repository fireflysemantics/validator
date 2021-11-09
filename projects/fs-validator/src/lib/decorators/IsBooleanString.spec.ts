import { IsBooleanString, validate } from ".."

test("IsBooleanString",()=> {
    class IsBooleanStringDemo {
        @IsBooleanString() alpha:string = 'true'
    }
    const IB = new IsBooleanStringDemo()
    expect(validate(IB).valid).toBeTruthy()
})