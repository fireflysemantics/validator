import { validate, validateN, validateProperty, IsDefined, IsNumber, IsString, ObjectErrors, ValidationError, EntityError } from '..';
import { validateEntities } from './validateEntities';

/**
 * The Master Data
 */
 export class MasterData {
    gid?: string;
    id?: string;
  
    @IsString()
    @IsDefined()
    public sku!: string;
    @IsString()
    @IsDefined()
    public supplier!: string;
    @IsString()
    @IsDefined()
    public location!: string;
    @IsNumber()
    @IsDefined()
    public safetyStock: number = 0;
    @IsNumber()
    @IsDefined()
    public leadTimeDays!: number;
    public orderSize: number = 1;
  
    constructor(md?: any) {
      if (md) {
        Object.assign(this, md);
      }
    }
  }
  const md0: MasterData = {
    sku: 'sk1',
    supplier: 's1',
    location: 'l1',
    leadTimeDays: 10,
    orderSize: 4,
    safetyStock: 5,
  };
  
  const md2: any = {
    sku: 'sk2',
    supplier: 's2',
    location: 'l2',
    safetyStock: 10,
    orderSize: 4,
  };
  

test('createEntityErrors', ()=>{
    const MD0 = new MasterData(md0);
    let OE: ObjectErrors = validate(MD0);
    let errors: ValidationError[] = OE.errors;
    expect(errors.length).toEqual(0)
  
    const MD1 = new MasterData();
    const validSKU: boolean = validateProperty(MD1, 'sku');
    expect(validSKU).toBeFalsy()
    OE = validate(MD1);
    errors = OE.errors;
    expect(errors.length).toEqual(4)
  
    const MD2 = new MasterData(md2);
    OE = validate(MD2);
    errors = OE.errors;

    expect(errors.length).toEqual(1)
  
    const MDS = [MD1, MD2];
    let OES: ObjectErrors[] = validateN(MDS);
  
    let entityErrors:EntityError[] = validateEntities(OES, 'sku')
    expect(entityErrors.length).toEqual(5)
  
    console.log(entityErrors);
})
