import { IsCreditCard, validate } from ".."

test("IsCreditCard",()=> {
    class IsCreditCardDemo {
        @IsCreditCard() card:string= '375556917985515'
    }
    const IB = new IsCreditCardDemo()
    expect(validate(IB).valid).toBeTruthy()
})