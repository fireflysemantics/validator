import { IsCurrency, validate } from ".."

test("IsCurrency", ()=> {
    class IsCurrencyDemo {
        @IsCurrency() card:string= '33.30'
    }
    const IB = new IsCurrencyDemo()
    expect(validate(IB).valid).toBeTruthy()
})