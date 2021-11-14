import { getPropertyKey } from "./utilities";
import { validate, validateProperty,validateN } from "./validate";
import { IfValid, IsAfterInstant, IsDate, IsString, IsInt, IsDefined } from '.'
import { ObjectErrors } from './ObjectErrors'

export class PurchaseOrder {
  @IsString()
  @IsDefined()
  id!: string;
  @IsString()
  @IsDefined()
  sku!: string;

  @IsDate()
  @IsDefined()
  purchaseDate!: Date;

  @IsAfterInstant('purchaseDate')
  @IsDate()
  @IsDefined()
  @IfValid('purchaseDate')
  receiptDate!: Date;

  @IsInt()
  @IsDefined()
  quantity!: number;
  constructor(o: any) {
    //===================================
    // Initialize the sku and id properties
    // with Object.assign
    //===================================
    Object.assign(this, o);
  }
}




test('validate()', ()=>{
  const po: PurchaseOrder = new PurchaseOrder({
    sku: null,
    id: '123',
    purchaseDate: new Date('2021-11-22'),
    receiptDate: new Date('2021-11-28'),
    quantity: 2,
  });
  const OE = validate(po)
  console.log(OE)
//  const OES:ObjectErrors[] = validateN([po])
  //console.log(OES)
  })