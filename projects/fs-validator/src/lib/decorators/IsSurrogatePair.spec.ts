import { IsSurrogatePair, validate } from ".."

test("IsSurrogatePair",()=> {
    class IsSurrogatePairDemo {
        @IsSurrogatePair() alpha:string = '𠮷野𠮷'
    }
    const IB = new IsSurrogatePairDemo()
    expect(validate(IB).valid).toBeTruthy()
})