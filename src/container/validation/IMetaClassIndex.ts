import { MetaClass } from "@fireflysemantics/container/validation/MetaClass";

export interface IMetaClassIndex {
    [validationContextKey: string]: MetaClass;
}

