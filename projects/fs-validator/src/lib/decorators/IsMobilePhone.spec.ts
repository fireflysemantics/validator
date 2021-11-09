import { IsMobilePhone, validate } from ".."

test("IsMobilePhone",()=> {
    class IsMobilePhoneDemo {
        @IsMobilePhone('en-US') alpha:any = '19876543210'
    }
    const IB = new IsMobilePhoneDemo()
    expect(validate(IB).valid).toBeTruthy()
})