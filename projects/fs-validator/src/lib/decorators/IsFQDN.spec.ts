import { IsFQDN, validate } from ".."

test("IsFQDN",()=> {
    class IsFQDNDemo {
        @IsFQDN() alpha:string = 'example.com'
    }
    const IB = new IsFQDNDemo()
    expect(validate(IB).valid).toBeTruthy()
})