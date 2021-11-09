import { IsArray, validate } from ".."

test("IsArray",()=> {
    class IsArrayDemo {
        @IsArray() alpha:any[] = [1,2]
    }
    const IA = new IsArrayDemo()
    expect(validate(IA).valid).toBeTruthy()
})