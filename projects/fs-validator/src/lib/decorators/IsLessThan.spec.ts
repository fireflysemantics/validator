import { ValidationContext } from "../ValidationContext";
import { validateProperty, validate,IsLessThan , getPropertyKey} from "..";

class IsNotLessThanTest0 {
    @IsLessThan(30)
    secondNumber: number = 40;
}
const INLT0 = new IsNotLessThanTest0();

class IsNotLessThanTest1 {
    firstNumber: number = 10;

    @IsLessThan("firstNumber")
    secondNumber: number = 15;
}
const INLT1 = new IsNotLessThanTest1();

class IsNotLessThanTest2 {
    firstNumber: number = 10;

    @IsLessThan("firstNumber")
    secondNumber: number = 10;
}
const INLTT2 = new IsNotLessThanTest2();

class IsLessThanTest2 {
    @IsLessThan(10)
    secondNumber: number = 5;
}
const ILTT2 = new IsLessThanTest2();

class IsLessThanTest3 {
    firstNumber: number = 20;

    @IsLessThan("firstNumber")
    secondNumber: number = 19;
}
const ILTT3 = new IsLessThanTest3();

test("IsLessThan", () => {
    let oes = validate(INLT0);
    expect(oes.valid).toBeFalsy();
    const key: string = getPropertyKey(INLT0, "secondNumber");
    const vc: ValidationContext = oes.getErrors(key)[0].vc;

    expect(validateProperty(INLT1, "secondNumber")).toBeFalsy();
    expect(validate(INLT1).valid).toBeFalsy();

    expect(validateProperty(INLTT2, "secondNumber")).toBeFalsy();
    expect(validate(INLTT2).valid).toBeFalsy();

    expect(validateProperty(ILTT2, "secondNumber")).toBeTruthy();
    expect(validate(ILTT2).valid).toBeTruthy();

    expect(validateProperty(ILTT3, "secondNumber")).toBeTruthy();
    expect(validate(ILTT3).valid).toBeTruthy();
});