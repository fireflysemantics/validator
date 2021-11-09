import { IsMilitaryTime, ObjectErrors, validate } from ".."

test("IsMilitaryTime",()=> {
    class IsNotMilitaryTimeDemo {
        @IsMilitaryTime() alpha:any = '01:02:34.75'
    }
    const INM = new IsNotMilitaryTimeDemo()
    expect(validate(INM).valid).toBeFalsy()

    class IsMilitaryTimeDemo {
        @IsMilitaryTime() alpha:any = '22:10'
    }
    const IB = new IsMilitaryTimeDemo()
 //   expect(validate(IB).valid).toBeTruthy()
})