import { IsUUID, validate } from ".."

test("IsUUID",()=> {
    class IsUUIDDemo {
        @IsUUID() alpha:string = 'A987FBC9-4BED-3078-CF07-9141BA07C9F3'
    }
    const IB = new IsUUIDDemo()
    expect(validate(IB).valid).toBeTruthy()
    class IsNotUUIDDemo {
        @IsUUID() alpha:string = '934859'
    }
    const INB = new IsNotUUIDDemo()
    expect(validate(INB).valid).toBeFalsy()
})