import { IsMongoID, ObjectErrors, validate } from ".."

test("IsMongoID",()=> {
    class IsMongoIDDemo {
        @IsMongoID() alpha:any = '507f1f77bcf86cd799439011'
    }
    const IB = new IsMongoIDDemo()
    expect(validate(IB).valid).toBeTruthy()
})