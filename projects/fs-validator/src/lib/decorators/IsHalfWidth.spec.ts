import { IsHalfWidth, validate } from ".."

test("IsFullWidth",()=> {
    class IsHalfWidthDemo {
        @IsHalfWidth() alpha:string = '!"#$%&()<>/+=-_? ~^|.,@`{}[]'
    }
    const IB = new IsHalfWidthDemo()
    expect(validate(IB).valid).toBeTruthy()
})