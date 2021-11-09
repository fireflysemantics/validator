import { IsByteLength, validate } from ".."

test("IsByteLength",()=> {
    class IsByteLengthDemo {
        @IsByteLength(0, 5) alpha:string= 'abc'
    }
    const IB = new IsByteLengthDemo()
    expect(validate(IB).valid).toBeTruthy()
})