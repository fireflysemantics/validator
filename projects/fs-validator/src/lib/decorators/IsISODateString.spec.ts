import { IsISODateString, ObjectErrors, validate } from ".."

test("IsISODateString",()=> {
    class IsISODateStringDemo {
        @IsISODateString() alpha:any = '2009-05-19'
    }
    const IB = new IsISODateStringDemo()

    expect(validate(IB).valid).toBeTruthy()

    class IsNotISODateStringDemo {
        @IsISODateString() alpha:any = '2009/05/19'
    }
    const INDS = new IsNotISODateStringDemo()

    expect(validate(INDS).valid).toBeFalsy()

    let oes:ObjectErrors = validate(INDS)
    //console.log(`THE OES from date string IS ${oes}`)
    expect(oes.valid).toBeFalsy()
    expect(oes.errors[0].message).toContain('2009/05/19')
    //console.log(oes.errors[0])
})