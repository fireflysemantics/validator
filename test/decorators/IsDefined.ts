import { ValidationOptions } from "@fireflysemantics/container/validation/ValidationOptions";
import { IsDefined} from '@fireflysemantics/decorators/IsDefined';
import { options } from '@test/setup';

export class NoOptionsInvalid {
  @IsDefined() p0: any = null;
}

export class NoOptionsValid {
  @IsDefined() p1: String = "";
  @IsDefined() p2: Date = new Date();
  @IsDefined() p3: Number = 0;
}

export class NoOptionsValidArray {
  @IsDefined() p4: Number[] = [1, 2];
  @IsDefined() p5: Number = 5;
}

export class Options {
  @IsDefined(options) p1: String = "";
  @IsDefined(options) p2: Date = new Date();
  @IsDefined(options) p3: Number = 0;
}

