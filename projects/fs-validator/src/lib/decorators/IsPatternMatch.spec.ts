import { IsPatternMatch, validate } from ".."

test("IsPatternMatch",()=> {
    class IsPatternMatchDemo {
        @IsPatternMatch(/xyz/) alpha:string = 'xyz'
    }
    const IB = new IsPatternMatchDemo()
    expect(validate(IB).valid).toBeTruthy()
})