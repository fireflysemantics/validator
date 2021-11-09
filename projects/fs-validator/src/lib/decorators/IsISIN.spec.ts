import { IsISIN, validate } from ".."

test("IsISIN",()=> {
    class IsISINDemo {
        @IsISIN() alpha:any = 'AU0000XVGZA3'
    }
    const IB = new IsISINDemo()
    expect(validate(IB).valid).toBeTruthy()
})